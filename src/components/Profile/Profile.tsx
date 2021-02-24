import classes from './Profile.module.scss';

export function Profile() {
  return (
    <div className={classes.container}>
      <img
        className={classes.profileImage}
        src="https://github.com/william-takayama.png"
        alt="profile image"
      />

      <div>
        <strong>William S. Takayama</strong>
        <p>
          <img
            className={classes.levelImg}
            src="assets/icons/level.svg"
            alt="Level"
          />
          Level 1
        </p>
      </div>
    </div>
  );
}
