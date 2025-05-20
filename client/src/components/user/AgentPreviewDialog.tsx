import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
// import CodeSandbox from "./CodeSandbox";
import styles from "./AgentPreviewDialog.module.css";

interface AgentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: {
    agentName: string;
    agentDescription: string;
    category: string;
  };
}

const AgentPreviewDialog = ({ open, onOpenChange, agent }: AgentPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <DialogTitle className={styles.dialogTitle}>Try {agent.agentName}</DialogTitle>
        <DialogDescription className={styles.dialogDescription}>{agent.agentDescription}</DialogDescription>
        {/* <CodeSandbox agentTitle={agent.title} agentCategory={agent.category} onClose={() => onOpenChange(false)} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default AgentPreviewDialog;
