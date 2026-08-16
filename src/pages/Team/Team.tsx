import { useTranslation } from "react-i18next";

import PageHero from "../../components/PageHero/PageHero";
import SectionCTA from "../../components/SectionCTA/SectionCTA";
import { useTranslatedList } from "../../hooks/useTranslatedList";
import type { TeamMember } from "../../types/content";
import "../sharedPages.css";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

const Team = () => {
  const { t } = useTranslation();
  const members = useTranslatedList<TeamMember>("team.members");

  return (
    <main>
      <PageHero
        eyebrow={t("team.hero.eyebrow")}
        title={t("team.hero.title")}
        text={t("team.hero.text")}
      />

      <section className="content-section">
        <div className="site-container team-grid">
          {members.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-card__avatar">{getInitials(member.name)}</div>
              <span className="team-card__role">{member.role}</span>
              <h3>{member.name}</h3>
              <p className="team-card__short">{member.short}</p>
              <p className="team-card__bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <SectionCTA />
    </main>
  );
};

export default Team;
