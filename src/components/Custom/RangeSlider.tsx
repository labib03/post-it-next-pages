import { useState } from "react";
import { Slider, RangeSlider } from "@mantine/core";

export default function CustomRangeSlider() {
  const [value, setValue] = useState(40);

  return (
    <>
      <Slider
        value={value}
        onChange={setValue}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
    </>
  );
}
