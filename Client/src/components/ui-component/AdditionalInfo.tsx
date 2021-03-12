import React from "react";

export default function AdditionalInfo(props: any) {
  const { Description, From, To, state } = props;
  if (!state) {
    return <span></span>;
  } else {
    return (
      <div>
        <h1>hhh</h1>
      </div>
    );
  }
}
