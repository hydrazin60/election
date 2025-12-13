"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Example voter data
const voters = [
  {
    serial_no: 1,
    voter_id: 9580501,
    full_name: "अइन्द्र वहादुर भुजेल",
    age: 58,
    gender: "male",
    spouse_name: null,
    parent_name: "पदम वहादुर/ सरस्वती",
  },
  //   {
  //     serial_no: 2,
  //     voter_id: 9580502,
  //     full_name: "सुशीला अधिकारी",
  //     age: 42,
  //     gender: "female",
  //     spouse_name: "राम अधिकारी",
  //     parent_name: "हरि अधिकारी/ गीता",
  //   },
  //   {
  //     serial_no: 3,
  //     voter_id: 9580503,
  //     full_name: "मोहन कुमार श्रेष्ठ",
  //     age: 35,
  //     gender: "male",
  //     spouse_name: "सीता श्रेष्ठ",
  //     parent_name: "राज कुमार/ सरस्वती",
  //   },
  //   {
  //     serial_no: 1,
  //     voter_id: 9580501,
  //     full_name: "अइन्द्र वहादुर भुजेल",
  //     age: 58,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "पदम वहादुर/ सरस्वती",
  //   },
  //   {
  //     serial_no: 2,
  //     voter_id: 9577084,
  //     full_name: "अक्कल सुमा राई",
  //     age: 65,
  //     gender: "female",
  //     spouse_name: "तिल विर",
  //     parent_name: "हर्क बहादुर/ बर्मा",
  //   },
  //   {
  //     serial_no: 3,
  //     voter_id: 15984920,
  //     full_name: "अच्चुत निरौला",
  //     age: 41,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "डिल्ली प्रसाद/ तुलसा",
  //   },
  //   {
  //     serial_no: 4,
  //     voter_id: 15985317,
  //     full_name: "अजय कटुवाल",
  //     age: 29,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "रण बहादुर/ शुभद्रा",
  //   },
  //   {
  //     serial_no: 5,
  //     voter_id: 30177635,
  //     full_name: "अजय कामी",
  //     age: 18,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "चन्द्रे / देवी माया",
  //   },
  //   {
  //     serial_no: 6,
  //     voter_id: 23529943,
  //     full_name: "अजित परियार",
  //     age: 26,
  //     gender: "male",
  //     spouse_name: "उर्मिला",
  //     parent_name: "हेमे / इन्दिरा",
  //   },
  //   {
  //     serial_no: 7,
  //     voter_id: 9577493,
  //     full_name: "अडिमर्दन राई",
  //     age: 68,
  //     gender: "male",
  //     spouse_name: "शिब कुमारी",
  //     parent_name: "तुला राम/ हस्त हिरा",
  //   },
  //   {
  //     serial_no: 8,
  //     voter_id: 9579659,
  //     full_name: "अन माया विश्वकर्मा",
  //     age: 64,
  //     gender: "female",
  //     spouse_name: "जस बहादुर",
  //     parent_name: "इन्द्र बहादुर/ चन्द्र माया",
  //   },
  //   {
  //     serial_no: 9,
  //     voter_id: 19893804,
  //     full_name: "अनिता थापा",
  //     age: 30,
  //     gender: "female",
  //     spouse_name: "उद्रब",
  //     parent_name: "धन बहादुर/ हरि माया",
  //   },
  //   {
  //     serial_no: 10,
  //     voter_id: 23056750,
  //     full_name: "अनिता परियार",
  //     age: 25,
  //     gender: "female",
  //     spouse_name: null,
  //     parent_name: "पदम बहादुर/ इन्दिरा",
  //   },
  //   {
  //     serial_no: 11,
  //     voter_id: 19897770,
  //     full_name: "अनिता परियार",
  //     age: 32,
  //     gender: "female",
  //     spouse_name: "हेमराज",
  //     parent_name: "मन बहादुर/ गा देबी",
  //   },
  //   {
  //     serial_no: 12,
  //     voter_id: 21985477,
  //     full_name: "अनिता बस्नेत",
  //     age: 34,
  //     gender: "female",
  //     spouse_name: "केवल",
  //     parent_name: "हस्त बहादुर/ गंगा माया",
  //   },
  //   {
  //     serial_no: 13,
  //     voter_id: 17496250,
  //     full_name: "अनिता बिष्ट",
  //     age: 27,
  //     gender: "female",
  //     spouse_name: null,
  //     parent_name: "तुलाराम / राधिका",
  //   },
  //   {
  //     serial_no: 14,
  //     voter_id: 9577035,
  //     full_name: "अनिता मेसुर",
  //     age: 43,
  //     gender: "female",
  //     spouse_name: "मिन बहादुर",
  //     parent_name: "राम चन्द्र/ विष्णु माया",
  //   },
  //   {
  //     serial_no: 15,
  //     voter_id: 9578799,
  //     full_name: "अनिता राई",
  //     age: 40,
  //     gender: "female",
  //     spouse_name: null,
  //     parent_name: "लक्ष्मी बहादुर/ दौली माया",
  //   },
  //   {
  //     serial_no: 16,
  //     voter_id: 21650361,
  //     full_name: "अनिता राई",
  //     age: 34,
  //     gender: "female",
  //     spouse_name: "विमल",
  //     parent_name: "टिका बहादुर/ चतुर माया",
  //   },
  //   {
  //     serial_no: 17,
  //     voter_id: 19764609,
  //     full_name: "अनिता राई",
  //     age: 33,
  //     gender: "female",
  //     spouse_name: "श्याम कुमार",
  //     parent_name: "जुद्ध विर/ फूल कुमारी",
  //   },
  //   {
  //     serial_no: 18,
  //     voter_id: 23456550,
  //     full_name: "अनिरुद्र विष्ट",
  //     age: 28,
  //     gender: "male",
  //     spouse_name: "अनजु",
  //     parent_name: "नैन बहादुर/ राधा कुमारी",
  //   },
  //   {
  //     serial_no: 19,
  //     voter_id: 9579275,
  //     full_name: "अनिल नेपाल",
  //     age: 36,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "लेख नाथ/ रमा",
  //   },
  //   {
  //     serial_no: 20,
  //     voter_id: 22819322,
  //     full_name: "अनिल नेपाली",
  //     age: 28,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "गणेश बहादुर नेपाली सार्की/ चन्द्र कला नेपाली सार्की",
  //   },
  //   {
  //     serial_no: 21,
  //     voter_id: 9620938,
  //     full_name: "अनिल राई",
  //     age: 45,
  //     gender: "male",
  //     spouse_name: "चन्द्र कला",
  //     parent_name: "जय लाल/ तिर्थ माया",
  //   },
  //   {
  //     serial_no: 22,
  //     voter_id: 16944049,
  //     full_name: "अनिल विश्वकर्मा",
  //     age: 32,
  //     gender: "male",
  //     spouse_name: null,
  //     parent_name: "कुमार / कल्पना",
  //   },
  {
    serial_no: 23,
    voter_id: 23456505,
    full_name: "अनिष तामाङ्ग",
    age: 25,
    gender: "male",
    spouse_name: null,
    parent_name: "गंगा बहादुर/ कुमारी",
  },
  {
    serial_no: 24,
    voter_id: 30261591,
    full_name: "अनिषा विश्वकर्मा",
    age: 20,
    gender: "female",
    spouse_name: null,
    parent_name: "अमर बहादुर/ नैना माया",
  },
  {
    serial_no: 25,
    voter_id: 22814993,
    full_name: "अनिषा कुँवर",
    age: 23,
    gender: "female",
    spouse_name: null,
    parent_name: "गोपाल / चन्द्रकला",
  },
  {
    serial_no: 26,
    voter_id: 23456507,
    full_name: "अनिषा तामाङ्ग",
    age: 26,
    gender: "female",
    spouse_name: null,
    parent_name: "गंगा बहादुर/ कुमारी",
  },
];

export default function VoterDataTable() {
  const [expandedVoter, setExpandedVoter] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-y-auto max-h-[500px] border rounded-md">
        <Table>
          <TableCaption>List of registered voters</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Serial No</TableHead>
              <TableHead>Voter ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Explore</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.voter_id}>
                <TableCell>{voter.serial_no}</TableCell>
                <TableCell>{voter.voter_id}</TableCell>
                <TableCell>{voter.full_name}</TableCell>
                <TableCell>{voter.age}</TableCell>
                <TableCell>{voter.gender}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() =>
                      setExpandedVoter(
                        expandedVoter === voter.voter_id ? null : voter.voter_id
                      )
                    }
                  >
                    {expandedVoter === voter.voter_id ? "Hide" : "Explore"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Expanded voter details */}
      {expandedVoter && (
        <div className="p-4 border rounded-md bg-gray-50">
          {voters
            .filter((v) => v.voter_id === expandedVoter)
            .map((v) => (
              <div key={v.voter_id} className="flex flex-col gap-2">
                <p>
                  <strong>Voter ID:</strong> {v.voter_id}
                </p>
                <p>
                  <strong>Full Name:</strong> {v.full_name}
                </p>
                <p>
                  <strong>Age:</strong> {v.age}
                </p>
                <p>
                  <strong>Gender:</strong> {v.gender}
                </p>
                <p>
                  <strong>Parent Name:</strong> {v.parent_name}
                </p>
                <p>
                  <strong>Spouse Name:</strong> {v.spouse_name || "-"}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
