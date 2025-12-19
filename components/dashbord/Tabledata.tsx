import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Voter } from "@/type/voter.type";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Hash,
  Users,
  MapPin,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  voters: Voter[];
  expandedVoter: number | null;
  onExpand: (id: number | null) => void;
}

interface MobileViewProps {
  voters: Voter[];
  expandedVoter: number | null;
  onExpand: (id: number | null) => void;
}

const MobileView: React.FC<MobileViewProps> = ({
  voters,
  expandedVoter,
  onExpand,
}) => (
  <div className="block md:hidden space-y-3 max-h-[550Px] overflow-y-scroll">
    {voters.length === 0 ? (
      <Card>
        <CardContent className="py-8 text-center">No voters found</CardContent>
      </Card>
    ) : (
      voters.map((voter) => (
        <Card key={voter._id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">{voter.full_name}</h3>
                <p className="text-xs text-muted-foreground">
                  ID: {voter.voter_id}
                </p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  onExpand(
                    expandedVoter === voter.voter_id ? null : voter.voter_id
                  )
                }
              >
                {expandedVoter === voter.voter_id ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Explore
                  </>
                )}
              </Button>
            </div>

            {/* 🔹 Info Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-muted-foreground">SN</p>
                <p className="font-medium">{voter.serial_no}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-medium">{voter.age}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="font-medium capitalize">{voter.gender}</p>
              </div>
            </div>

            {/* 🔹 Divider */}
            <div className="border-t pt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {voter.location.district}, {voter.location.municipality} – Ward{" "}
                {voter.location.wardNumber}
              </span>
            </div>
          </CardContent>
        </Card>
      ))
    )}
  </div>
);

function Tabledata({ voters, expandedVoter, onExpand }: Props) {
  const expandedVoterData = expandedVoter
    ? voters.find((voter) => voter.voter_id === expandedVoter)
    : null;
  console.log("voterrrrrrr", voters[0].location);
  return (
    <>
      <div className="hidden md:block overflow-y-auto max-h-[500px] border rounded-md">
        <Table>
          <TableCaption>List of registered voters</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SN</TableHead>
              <TableHead>Voter ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Location</TableHead>
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
                    <p className="text-xs">
                      {voter.location.district}, {voter.location.municipality} –
                      Ward {voter.location.wardNumber}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onExpand(
                          expandedVoter === voter.voter_id
                            ? null
                            : voter.voter_id
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

      <MobileView
        voters={voters}
        expandedVoter={expandedVoter}
        onExpand={onExpand}
      />

      <Dialog open={!!expandedVoterData} onOpenChange={() => onExpand(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Voter Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the voter
            </DialogDescription>
          </DialogHeader>

          {expandedVoterData && (
            <div className="space-y-0 pt-2">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {expandedVoterData.full_name}
                    </h3>
                  </div>
                  <div className="text-center px-3 py-1 bg-gray-100 rounded-lg">
                    <span className="flex items-center gap-1 text-sm font-semibold text-zinc-700 ">
                      <Hash className="h-3 w-3" />
                      ID: {expandedVoterData.voter_id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full ">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    Age: {expandedVoterData.age}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      expandedVoterData.gender?.toLowerCase() === "male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {expandedVoterData.gender}
                  </div>
                  <span className="flex flex-col text-sm font-semibold text-zinc-700">
                    <p className="text-xs text-gray-500">Serial No.</p>
                    <p className="font-bold">{expandedVoterData.serial_no}</p>
                  </span>
                </div>
              </div>

              {(expandedVoterData.spouse_name ||
                expandedVoterData.parent_name) && (
                <div className="space-y-3 pt-2 border-t">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Family Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {expandedVoterData.spouse_name && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Spouse Name</p>
                        <p className="font-medium">
                          {expandedVoterData.spouse_name}
                        </p>
                      </div>
                    )}
                    {expandedVoterData.parent_name && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Parent Name</p>
                        <p className="font-medium">
                          {expandedVoterData.parent_name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {expandedVoterData.location && (
                <div className="space-y-3 pt-3 border-t">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {expandedVoterData.location.province && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Province</p>
                        <p className="font-medium">
                          {expandedVoterData.location.province}
                        </p>
                      </div>
                    )}
                    {expandedVoterData.location.district && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">District</p>
                        <p className="font-medium">
                          {expandedVoterData.location.district}
                        </p>
                      </div>
                    )}
                    {expandedVoterData.location.municipality && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Municipality</p>
                        <p className="font-medium">
                          {expandedVoterData.location.municipality}
                        </p>
                      </div>
                    )}
                    {expandedVoterData.location.wardNumber && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Ward Number</p>
                        <p className="font-medium">
                          {expandedVoterData.location.wardNumber}
                        </p>
                      </div>
                    )}
                    {expandedVoterData.location.pollingCenter && (
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <p className="text-sm text-gray-500">Polling Center</p>
                        <p className="font-medium">
                          {expandedVoterData.location.pollingCenter}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Tabledata;
