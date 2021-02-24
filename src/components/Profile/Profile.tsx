import classes from './Profile.module.scss';

export function Profile() {
  return (
    <div className={classes.container}>
      <img src="https://github.com/william-takayama.png" alt="profile image" />

      <div>
        <strong>Willia S. Takayama</strong>
        <p>Level 1</p>
      </div>
    </div>
  );
}
