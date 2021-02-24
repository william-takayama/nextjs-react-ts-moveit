import classes from "./ExperienceBar.module.scss";

export function ExperienceBar() {
  return (
    <header className={classes.header}>
      <span>0 xp</span>
      <div>
        <div style={{ width: "60%" }} />
        <span className={classes.currentExperience} style={{ left: "50%" }}>
          300xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
}
