import {
  interpolateBlues,
  interpolateCubehelixDefault,
  interpolateInferno,
  interpolateMagma,
  interpolateViridis,
  interpolateYlOrRd,
} from "d3-scale-chromatic";
import { color } from "d3-color";
import chroma from "chroma-js";
import { useDispatch } from "react-redux";
import { replaceColors, setTheNumberOfColors } from "../../store/colorReducer";
import { useEffect, useState } from "react";
import {
  DefaultDropdownMenuOption,
  Dropdown,
  InputText,
  InputToggle,
} from "czifui";
import { StyledForm, StyledLabel, FormControl } from "./style";
import { useSnackbar } from "notistack";

type InterpolatorNames =
  | "Blues"
  | "Cubehelix"
  | "Inferno"
  | "Magma"
  | "Virdis"
  | "YlOrRd";

type Interpolator = Record<InterpolatorNames, (t: number) => string>;

const INTERPOLATORS: Interpolator = {
  Blues: interpolateBlues,
  Cubehelix: interpolateCubehelixDefault,
  Inferno: interpolateInferno,
  Magma: interpolateMagma,
  Virdis: interpolateViridis,
  YlOrRd: interpolateYlOrRd,
};

const OPTIONS = [
  // { name: "Cubehelix", section: "Diverging" },
  { name: "Blues", section: "Sequential" },
  { name: "Inferno", section: "Sequential" },
  { name: "Magma", section: "Sequential" },
  { name: "Virdis", section: "Sequential" },
  { name: "YlOrRd", section: "Sequential" },
];

const ColorGeneratorForm: React.FC = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [interpolator, setInterpolator] = useState<string>("Virdis");
  const [numberOfColors, setNumberOfColors] = useState<number>(8);
  const [bezier, setBezier] = useState(false);
  const [lightness, setLightness] = useState(false);

  useEffect(() => {
    const newColors = [...Array(numberOfColors).keys()].map((x) => {
      let interpolatedColor;
      let value = x / (numberOfColors - 1);

      switch (interpolator) {
        case "Blues":
          interpolatedColor = interpolateBlues(value);
          break;
        case "Cubehelix":
          interpolatedColor = interpolateCubehelixDefault(value);
          break;
        case "Inferno":
          interpolatedColor = interpolateInferno(value);
          break;
        case "Magma":
          interpolatedColor = interpolateMagma(value);
          break;
        case "Virdis":
          interpolatedColor = interpolateViridis(value);
          break;
        case "YlOrRd":
          interpolatedColor = interpolateYlOrRd(value);
          break;
        default:
          interpolatedColor = "#000000";
      }

      let result = color(interpolatedColor)?.formatHex();
      return result ? result : "#000000";
    });

    let finalColors = bezier
      ? chroma
          .bezier(newColors)
          .scale()
          .correctLightness(lightness)
          .colors(numberOfColors)
      : chroma
          .scale(newColors)
          .correctLightness(lightness)
          .colors(numberOfColors);

    dispatch(replaceColors(finalColors));
    dispatch(setTheNumberOfColors(numberOfColors));
  }, [interpolator, numberOfColors, bezier, lightness]);

  return (
    <div>
      <StyledForm>
        <h3>Customize</h3>

        <StyledLabel>Color Interpolator: </StyledLabel>
        <Dropdown
          label={interpolator}
          options={OPTIONS}
          onChange={changeInterpolator}
          InputDropdownProps={{
            sdsType: "singleSelect",
            sdsStyle: "square",
          }}
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 220 },
            },
            groupBy: (option: DefaultDropdownMenuOption) =>
              option.section as string,
          }}
        />

        <InputText
          id="numberOfColors"
          sdsType="textField"
          label="Number of Colors:"
          placeholder="Number of colors"
          intent="default"
          name="number-of-colors"
          type="number"
          onChange={changeNumber}
          fullWidth
          value={numberOfColors}
        />

        <FormControl>
          <StyledLabel>Bezier Interpolation: </StyledLabel>
          <InputToggle onChange={handleBezierInterpolation} />
        </FormControl>

        <FormControl>
          <StyledLabel>Normalize Lightness: </StyledLabel>
          <InputToggle onChange={handleNormalizeLightness} />
        </FormControl>
      </StyledForm>
    </div>
  );

  function changeInterpolator(interpolator: DefaultDropdownMenuOption | null) {
    interpolator && setInterpolator(interpolator.name);
  }

  function changeNumber(event: React.ChangeEvent) {
    let num = parseInt((event.target as HTMLInputElement).value);
    if (num <= 20 && num > 1) {
      setNumberOfColors(num);
    } else {
      enqueueSnackbar(`The number of colors should be between 2 and 20.`, {
        variant: "warning",
      });
    }
  }

  function handleBezierInterpolation(event: React.ChangeEvent) {
    setBezier((event.target as HTMLInputElement).checked);
  }

  function handleNormalizeLightness(event: React.ChangeEvent) {
    setLightness((event.target as HTMLInputElement).checked);
  }
};

export default ColorGeneratorForm;
