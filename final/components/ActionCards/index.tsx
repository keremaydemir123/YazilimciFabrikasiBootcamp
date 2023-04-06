import React from "react";
import ActionCardContainer from "./ActionCardContainer";
import ActionCard from "./ActionCard";
import WrenchIcon from "@/icons/WrenchIcon";
import RocketIcon from "@/icons/RocketIcon";
import CommentIcon from "@/icons/CommentIcon";

function ActionCards() {
  return (
    <ActionCardContainer>
      <ActionCard>
        <WrenchIcon className="action-card-icon" />
        <h1 className="action-card-text">Fix Your Code</h1>
      </ActionCard>
      <ActionCard>
        <RocketIcon className="action-card-icon" />
        <h1 className="action-card-text">Refactor</h1>
      </ActionCard>
      <ActionCard>
        <CommentIcon className="action-card-icon" />
        <h1 className="action-card-text">Add Comments</h1>
      </ActionCard>
    </ActionCardContainer>
  );
}

export default ActionCards;
