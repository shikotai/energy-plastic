import { Mail, MapPin, Phone, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import PageHero from "../../components/PageHero/PageHero";
import { SITE_CONTACTS } from "../../config/site";
import "../sharedPages.css";
import { HERO_IMAGES } from "../../config/heroImages";

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <main>
      <PageHero
        eyebrow={t("contacts.hero.eyebrow")}
        title={t("contacts.hero.title")}
        text={t("contacts.hero.text")} image={HERO_IMAGES.contacts} />

      <section className="content-section">
        <div className="site-container">
          <div className="contact-grid">
            <article className="contact-card">
              <Phone size={25} />
              <h3>{t("contacts.cards.phone")}</h3>
              {SITE_CONTACTS.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              ))}
            </article>

            <article className="contact-card">
              <Mail size={25} />
              <h3>{t("contacts.cards.email")}</h3>
              <a href={`mailto:${SITE_CONTACTS.email}`}>{SITE_CONTACTS.email}</a>
            </article>

            <article className="contact-card">
              <MapPin size={25} />
              <h3>{t("contacts.cards.location")}</h3>
              <p>{t("contacts.cards.locationValue")}</p>
            </article>
          </div>

          <div className="notice">{t("contacts.note")}</div>
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="site-container two-column two-column--center">
          <div className="copy-block">
            <div className="section-eyebrow">
              <span />{t("contacts.cooperation.eyebrow")}
            </div>
            <h2>{t("contacts.cooperation.title")}</h2>
            <p>{t("contacts.cooperation.text")}</p>
          </div>

          <div className="dark-panel">
            <UsersRound size={34} color="#9de0b8" />
            <div className="dark-panel__big dark-panel__big--medium">B2B + R&amp;D</div>
            <p>{t("contacts.cooperation.panel")}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacts;
