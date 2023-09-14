"use client";
import { addFollowers } from "@/store/followerReducer";
import { useDispatch, useSelector } from "react-redux";


export default function Followers() {
  const followers = useSelector((state: any) => state.followers.followers);
  const dispatch = useDispatch();
  console.log(followers);

  const addFollower = (nickname) => {
    const follower = [
      ...nickname
    ];
    dispatch(addFollowers(follower));
  };

  return (
    <div>
      <button onClick={() => addFollower(prompt())}>Add followers</button>
      <ul>
        {followers.map((follower: string) => (
          <li key={follower}>{follower}</li>
        ))}
      </ul>
    </div>
  );
}
