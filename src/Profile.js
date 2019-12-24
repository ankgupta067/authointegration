import React, { useState,useEffect } from "react";

const Profile = props => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    props.auth.getUserProfile((profile, err) => {
      setUserProfile(profile);
      setError(err);
    });
  }, []);

  console.log("------" + userProfile);
  if (!userProfile) return <h1>{error}</h1>;
  return (
    <>
      <h1>Profile</h1>
      <p>{userProfile.nickName}</p>
      <img
        style={{ maxHeight: 50, maxWidth: 50 }}
        src={userProfile.picture}
        alt=""
      ></img>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </>
  );
};

export default Profile;
