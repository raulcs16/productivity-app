import { ExplorerType } from "@/src/core/explorer/explorer";
import ContextButton from "../shared/controls/ContextButton";
import TextInput from "../shared/controls/TextInput";
import Scrim from "../shared/controls/Scrim";

interface ExplorerRowProps {
  type: ExplorerType;
  title: string;
  route?: string;
  editable: boolean;
  selected: boolean;
  style?: React.CSSProperties;
  onContextMenu: (x: number, y: number) => void;
  onSelected: () => void;
  onRename: (newTitle: string) => void;
  onCancelEdit: () => void;
}
export default function ExplorerRow(props: ExplorerRowProps) {
  return props.editable ? (
    <div className="w-full px-2">
      <Scrim z={40} onClickedAway={() => props.onCancelEdit()}></Scrim>
      <div className="relative z-50" style={props.style}>
        <TextInput
          onEnter={(text) => {
            props.onRename(text);
          }}
          onChange={(text) => {}}
          placeHolder={props.title}
          onBlur={() => {
            props.onCancelEdit();
          }}
        />
      </div>
    </div>
  ) : (
    <li
      className={` w-full hover:bg-[#FFFFFF11] cursor-pointer px-3 list-none  ${
        props.selected && "bg-[#FFFFFF11]"
      } ${props.type === ExplorerType.Container && "font-bold text-blue-400"}`}
      onClick={() => props.onSelected()}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onContextMenu(e.clientX, e.clientY);
      }}
    >
      <ContextButton
        onClick={(x, y) => {
          props.onContextMenu(x, y);
        }}
      >
        <p className="py-1 text-lg truncate max-w-[15ch]" style={props.style}>
          {props.title}
        </p>
      </ContextButton>
    </li>
  );
}
