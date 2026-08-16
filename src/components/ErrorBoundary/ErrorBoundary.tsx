import { Component, type ErrorInfo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import "./ErrorBoundary.css";

type Props = { children: ReactNode };
type State = { hasError: boolean };

const ErrorFallback = () => {
  const { t } = useTranslation();

  return (
    <main className="error-screen">
      <div className="error-screen__card">
        <span>ENERGY PLASTIC</span>
        <h1>{t("errorBoundary.title")}</h1>
        <p>{t("errorBoundary.text")}</p>
        <div className="error-screen__actions">
          <button type="button" onClick={() => window.location.reload()}>
            {t("errorBoundary.reload")}
          </button>
          <a href={import.meta.env.BASE_URL}>{t("errorBoundary.home")}</a>
        </div>
      </div>
    </main>
  );
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Energy Plastic UI error:", error, info);
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}

export default ErrorBoundary;
