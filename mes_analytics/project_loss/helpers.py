import os

from pabutools.analysis import ProjectLoss, calculate_project_loss
from pabutools.election import GroupSatisfactionMeasure, Instance, parse_pabulib, Cost_Sat
from pabutools.rules import AllocationDetails, method_of_equal_shares, exhaustion_by_budget_increase
from project_loss.models import Project

def run_pabutools_analytics(file_path: str, exhaust: bool) -> list[Project]:
    
    instance, profile = parse_pabulib(file_path)
    sat_profile = profile.as_sat_profile(sat_class=Cost_Sat)
    voter_counts = calculate_voter_counts(
        instance, sat_profile
    )

    if exhaust: 
        budget_allocation = exhaustion_by_budget_increase(
            instance,
            profile,
            rule=method_of_equal_shares,
            rule_params={ "analytics": True, "sat_profile": sat_profile }
        )
    else:
        budget_allocation = method_of_equal_shares(
            instance, profile, sat_profile=sat_profile, analytics=True
        )

    project_losses = calculate_project_loss(budget_allocation.details)
    return prepare_projects(budget_allocation.details, voter_counts, project_losses)

def prepare_projects(
    details: AllocationDetails,
    voter_counts: dict[str, int],
    project_losses: list[ProjectLoss],
) -> list[Project]:
    result: list[Project] = []
    for idx, project_loss in enumerate(project_losses):
        simplfied_budget_lost: dict[str, float] = {}
        for proj, val in project_loss.budget_lost.items():
            simplfied_budget_lost[proj.name] = round(float(val), 2)

        result.append(
            Project(
                name=project_loss.name,
                round_number=idx + 1,
                cost=round(float(project_loss.cost), 2),
                vote_count=voter_counts[project_loss.name],
                initial_budget=round(
                    float(
                        voter_counts[project_loss.name]
                        * details.initial_budget_per_voter
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
