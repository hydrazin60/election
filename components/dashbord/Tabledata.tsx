import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Voter } from "@/type/voter.type";

interface Props {
  voters: Voter[];
  expandedVoter: number | null;
  onExpand: (id: number | null) => void;
}

function Tabledata({ voters, expandedVoter, onExpand }: Props) {
  console.log(" indivusial data :", voters);
  return (
    <div className="overflow-y-auto max-h-[500px] border rounded-md">
      <Table>
        <TableCaption>List of registered voters</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>Voter ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Explore</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {voters.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No voters found
              </TableCell>
            </TableRow>
          ) : (
            voters.map((voter) => (
              <TableRow key={voter._id}>
                <TableCell>{voter.serial_no}</TableCell>
                <TableCell>{voter.voter_id}</TableCell>
                <TableCell>{voter.full_name}</TableCell>
                <TableCell>{voter.age}</TableCell>
                <TableCell>{voter.gender}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onExpand(
                        expandedVoter === voter.voter_id ? null : voter.voter_id
                      )
                    }
                  >
                    {expandedVoter === voter.voter_id ? "Hide" : "Explore"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Tabledata;
