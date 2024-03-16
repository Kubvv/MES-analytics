from django.db import models

class Election:
    def __init__(
        self,
        name,
        initial_budget,
        vote_count,
        final_budget_per_voter,
        exhaust,
        projects
    ):
        self.name: str = name if name is not None else 'Election'
        self.initialBudget: float = initial_budget
        self.voteCount: int = vote_count
        self.finalBudgetPerVoter: float = final_budget_per_voter
        self.exhaust: bool = exhaust
        self.projects: list[Project] = projects

class Project:
    def __init__(
        self,
        round_number,
        name,
        cost,
        vote_count,
        effective_vote_count,
        initial_budget,
        final_budget,
        budget_lost,
    ):
        self.name: str = name
        self.roundNumber: int = round_number
        self.cost: float = cost
        self.voteCount: int = vote_count
        self.effectiveVoteCount: float = effective_vote_count
        self.initialBudget: float = initial_budget
        self.finalBudget: float = final_budget
        self.wasPicked: bool = final_budget >= cost
        self.budgetLost: dict[str, float] = budget_lost
