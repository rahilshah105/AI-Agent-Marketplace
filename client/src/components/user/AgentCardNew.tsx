import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import styles from "./AgentCard.module.css";
import AgentPreviewDialog from "./AgentPreviewDialog";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useContext } from "react";

export interface AgentCardProps {
  _id: string;
  agentName: string;
  agentDescription: string;
  category: string;
  rating: number;
  reviews: number;
  agentThumbnail?: string;
  popular?: boolean;
}

const AgentCardNew = ({
  _id,
  agentName,
  agentDescription,
  category,
  rating,
  reviews,
  agentThumbnail,
  popular,
}: AgentCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const { backendUrl, getToken, fetchUserData } = useContext(AppContext);

  return (
    <>
      <Link to={`/agent/${_id}`} className={styles.cardLink}>
        <Card className={styles.card}>
          {popular && <div className={styles.popularBadge}></div>}

          <div className={styles.imageContainer}>
            {agentThumbnail ? (
              <img src={agentThumbnail} alt={agentName} className={styles.agentThumbnail} />
            ) : (
              <div className={styles.placeholderWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.placeholderIcon}
                >
                  <path d="M19 15.6c0 1-1.8 1.4-3 1.4-2.8 0-5-2.2-5-5s2.2-5 5-5c1.5 0 3 .6 3 1.5V7" />
                  <circle cx="5" cy="9" r="1" />
                  <circle cx="6" cy="17" r="1" />
                  <path d="M4 4a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4Z" />
                  <path d="M3 16a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H3Z" />
                  <path d="M12 10a3 3 0 0 0-2.82 4" strokeDasharray="2 2" />
                  <path d="M18.3 10A3 3 0 0 1 15 6.3" strokeDasharray="2 2" />
                </svg>
              </div>
            )}
          </div>

          <CardHeader className={styles.header}>
            <div className={styles.headerContent}>
              <div>
                <div className={styles.badgeWrapper}>{/* <Badge variant="secondary">{category}</Badge> */}</div>
                <h3 className={styles.title}>{agentName}</h3>
              </div>
              <div className={styles.ratingWrapper}>
                <Star className={styles.starIcon} />
                <span className={styles.rating}>{rating}</span>
                <span className={styles.reviewCount}>({reviews})</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className={styles.content}>
            <p className={styles.description}>{agentDescription}</p>
          </CardContent>

          <CardFooter className={styles.footer}>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPreviewOpen(true);
              }}
            >
              Preview
            </Button>

            <Button
              size="sm"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                setAdding(true);
                try {
                  const token = await getToken();
                  await axios.post(
                    `${backendUrl}/api/user/add-to-workspace`,
                    { agentId: _id },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  // Refresh user data to update workspace agents
                  await fetchUserData();
                } catch (error: any) {
                  console.error("Error adding to workspace:", error);
                } finally {
                  setAdding(false);
                }
              }}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add to workspace"}
            </Button>
          </CardFooter>
        </Card>
      </Link>

      <AgentPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        agent={{ agentName, agentDescription, category }}
      />
    </>
  );
};

export default AgentCardNew;
