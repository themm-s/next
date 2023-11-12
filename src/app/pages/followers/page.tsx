"use client";
import { addFollowers } from "@/store/Reducers/followerReducer";
import { useDispatch, useSelector } from "react-redux";


export default function Followers() {
  const followers = useSelector((state: any) => state.followers.followers);
  const dispatch = useDispatch();

  const addFollower = (nickname: any) => {
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
