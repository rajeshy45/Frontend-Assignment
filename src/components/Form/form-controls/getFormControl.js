import Group from "./Group";
import Ignore from "./Ignore";
import Input from "./Input";
import Radio from "./Radio";
import Select from "./Select";
import Switch from "./Switch";

export default function getFormControl(uiType) {
    switch (uiType) {
        case "Input":
            return Input;
        case "Group":
            return Group;
        case "Radio":
            return Radio;
        case "Ignore":
            return Ignore;
        case "Select":
            return Select;
        case "Switch":
            return Switch;
        default:
            return null;
    }
}