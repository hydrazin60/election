import { Voter } from "@/type/voter.type";
import React from "react";

interface Props {
  voter: Voter | null;
}

function IndivusialVoterData({ voter }: Props) {
  if (!voter) return null;

  return (
    <div className="p-6 border rounded-md bg-gray-50 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Personal Information
          </h3>

          <p>
            <strong>Voter ID:</strong> {voter.voter_id}
          </p>
          <p>
            <strong>Full Name:</strong> {voter.full_name}
          </p>
          <p>
            <strong>Age:</strong> {voter.age}
          </p>
          <p>
            <strong>Gender:</strong> {voter.gender}
          </p>
          <p>
            <strong>Parent Name:</strong> {voter.parent_name}
          </p>
          <p>
            <strong>Spouse Name:</strong> {voter.spouse_name || "-"}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Location Information
          </h3>

          <p>
            <strong>Province:</strong> {voter.location.province}
          </p>
          <p>
            <strong>District:</strong> {voter.location.district}
          </p>
          <p>
            <strong>Municipality:</strong> {voter.location.municipality}
          </p>
          <p>
            <strong>Ward:</strong> {voter.location.wardNumber}
          </p>
          <p>
            <strong>Polling Center:</strong> {voter.location.pollingCenter}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IndivusialVoterData;
