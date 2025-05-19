
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      {/* Background decoration */}
      <div className={styles.decoration}>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorCircle3}></div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Discover and Deploy <span className={styles.gradientText}>AI Agents</span> for Every Task
          </h1>
          <p className={styles.description}>
            Explore our marketplace of specialized AI agents to automate your workflow, enhance productivity, and unlock new possibilities.
          </p>
          <div className={styles.buttonGroup}>
            <Button size="lg" className="text-md px-8 py-6">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-md px-8 py-6">
              Browse Agents
            </Button>
          </div>
          
          <div className={styles.featuredSection}>

            <div className={styles.featuredGrid}>
              <div className={styles.featuredItem}>
                <div className={`${styles.featureIconWrapper} ${styles.primaryIconWrapper}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                </div>
                <h3 className={styles.featureTitle}>Research Assistant</h3>
                <p className={styles.featureDescription}>Compiles data, generates insights, and creates comprehensive reports.</p>
              </div>
              
              <div className={styles.featuredItem}>
                <div className={`${styles.featureIconWrapper} ${styles.secondaryIconWrapper}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.secondaryIcon}><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M12 10c1-.56 2.78-2 5-2a4.9 4.9 0 0 1 5 4.78"/></svg>
                </div>
                <h3 className={styles.featureTitle}>Content Creator</h3>
                <p className={styles.featureDescription}>Generates blog posts, social media content, and marketing materials.</p>
              </div>
              
              <div className={styles.featuredItem}>
                <div className={`${styles.featureIconWrapper} ${styles.accentIconWrapper}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.accentIcon}><path d="M16 18a4 4 0 0 0-8 0"/><circle cx="12" cy="11" r="3"/><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="3" x2="21" y1="15" y2="15"/></svg>
                </div>
                <h3 className={styles.featureTitle}>Customer Support</h3>
                <p className={styles.featureDescription}>Provides 24/7 support, answers questions, and resolves customer issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;