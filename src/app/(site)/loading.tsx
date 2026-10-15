import styles from "./loading.module.css";

export default function SiteLoading() {
  return (
    <div className={styles.shell} aria-busy="true" aria-live="polite">
      <div className={styles.pulse}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <p className={styles.label}>Cargando</p>
    </div>
  );
}
