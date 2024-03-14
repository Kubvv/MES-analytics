from django.db import models


class Project:
    def __init__(
        self,
        round_number,
        name,
        cost,
        vote_count,
        initial_budget,
        final_budget,
        budget_lost,
    ):
        self.name: str = name
        self.roundNumber: int = round_number
        self.cost: float = cost
        self.voteCount: int = vote_count
        self.initialBudget: float = initial_budget
        self.finalBudget: float = final_budget
        self.wasPicked: bool = final_budget >= cost
        self.budgetLost: dict[str, float] = budget_lost
