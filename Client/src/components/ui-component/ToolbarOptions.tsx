import { Button } from "@material-ui/core";
import React from "react";
import StarIcon from "@material-ui/icons/Star";

export default function ToolbarOptions(props: any) {
  return (
    <div>
      <Button>Home</Button>
      <Button>Hotels</Button>
      <Button>Flights</Button>
      <Button>Packages</Button>
      <Button>Hotels In Israel</Button>
      <Button>flights To Eilat</Button>
    </div>
  );
}
