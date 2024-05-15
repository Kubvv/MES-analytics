import os

from pabutools.analysis import ProjectLoss, calculate_project_loss, calculate_effective_supports
from pabutools.election import GroupSatisfactionMeasure, Instance, parse_pabulib, Cost_Sat, Profile
from pabutools.rules import BudgetAllocation, AllocationDetails, method_of_equal_shares, exhaustion_by_budget_increase
from project_loss.models import Project, Election

def run_pabutools_analytics(file_path: str, options: dict[str, bool]) -> Election:
    instance, profile = parse_pabulib(file_path)
    sat_profile = profile.as_sat_profile(sat_class=Cost_Sat)
    voter_counts = calculate_voter_counts(
        instance, sat_profile
    )
    initial_budget = round(float(instance.budget_limit), 2)

    if options["exhaust"]: 
        budget_allocation = exhaustion_by_budget_increase(
            instance,
            profile,
            rule=method_of_equal_shares,
            rule_params={ "analytics": True, "sat_profile": sat_profile },
            budget_step=len(profile),
            exhaustive_stop=not options['feasible-stop']
        )
    else:
        budget_allocation = method_of_equal_shares(
            instance, profile.as_multiprofile(), sat_profile=sat_profile, analytics=True
        )

    project_losses = calculate_project_loss(budget_allocation.details)
    effective_supports = {}
    if options["eff-support"]:
        effective_supports = get_effective_supports(instance, profile, budget_allocation, { "sat_profile": sat_profile })
    projects = prepare_projects(instance, budget_allocation.details, voter_counts, effective_supports, project_losses)
    return Election(
        instance.meta['description'],
        initial_budget,
        len(profile),
        round(float(budget_allocation.details.iterations[0].voters_budget[0]), 2),
        options["exhaust"],
        projects
    )

def prepare_projects(
    instance: Instance,
    details: AllocationDetails,
    voter_counts: dict[str, int],
    effective_supports: dict[str, int],
    project_losses: list[ProjectLoss],
) -> list[Project]:
    result: list[Project] = []
    initial_budget_per_voter = details.iterations[0].voters_budget[0]
    for idx, project_loss in enumerate(project_losses):
        simplfied_budget_lost: dict[str, float] = {}
        for proj, val in project_loss.budget_lost.items():
            simplfied_budget_lost[instance.project_meta[proj]['name']] = round(float(val), 2)

        result.append(
            Project(
                name=instance.project_meta[project_loss]['name'],
                round_number=idx + 1,
                cost=round(float(project_loss.cost), 2),
                vote_count=voter_counts[project_loss.name],
                effective_support=effective_supports[project_loss.name] if project_loss.name in effective_supports else -1,
                initial_budget=round(
                    float(
                        voter_counts[project_loss.name]
                        * initial_budget_per_voter
                    ),
                    2,
                ),
                final_budget=round(float(project_loss.supporters_budget), 2),
                budget_lost=simplfied_budget_lost,
            )
        )

    return result


def calculate_voter_counts(
    instance: Instance, profile: GroupSatisfactionMeasure
) -> dict[str, int]:
    result: dict[str, int] = {}
    for project in instance:
        result[project.name] = 0
        for ballot in profile:
            if ballot.sat_project(project) > 0:
                result[project.name] = result[project.name] + 1

    return result

def get_effective_supports(
    instance: Instance, profile: Profile, allocation: BudgetAllocation, mes_params: dict
) -> dict[str, int]:
    res: dict[str, int] = {}
    for project, support in calculate_effective_supports(instance, profile, allocation, mes_params, allocation.details.get_final_budget()).items():
        res[project.name] = support
    return res


