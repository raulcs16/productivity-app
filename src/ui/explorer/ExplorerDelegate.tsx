import { ExplorerType } from "@/src/core/explorer/explorer";
import ContextButton from "../controls/ContextButton";
import TextInput from "../controls/TextInput";
import Scrim from "../controls/Scrim";

interface ExplorerDelegateProps {
  id: number;
  type: ExplorerType;
  title: string;
  route?: string;
  editable: boolean;
  selected: boolean;
  style?: React.CSSProperties;
  onContextMenu: (id: number, x: number, y: number) => void;
  onSelected: (id: number) => void;
  onRename: (id: number, title: string) => void;
  onCancelEdit: (id: number) => void;
}
export default function ExplorerDelegate(props: ExplorerDelegateProps) {
  return props.editable ? (
    <div className="w-full px-2 ">
      <Scrim z={40} onClickedAway={() => props.onCancelEdit(props.id)}></Scrim>
      <div className="relative z-50" style={props.style}>
        <TextInput
          onEnter={(text) => {
            props.onRename(props.id, text);
          }}
          onChange={(text) => {}}
          placeHolder={props.title}
          onBlur={() => {
            props.onCancelEdit(props.id);
          }}
        />
      </div>
    </div>
  ) : (
    <li
      className={` w-full hover:bg-[#FFFFFF01] cursor-pointer px-3 ${
        props.selected && "bg-[#FFFFFF11]"
      } ${props.type === ExplorerType.Container && "font-bold text-blue-400"}`}
      onClick={() => {
        props.onSelected(props.id);
      }}
      onContextMenu={(e) => {
        //get global x and global y
        e.preventDefault();
        e.stopPropagation();
        props.onContextMenu(props.id, e.clientX, e.clientY);
      }}
    >
      <ContextButton
        onClick={(x, y) => {
          props.onContextMenu(props.id, x, y);
        }}
      >
        <p className="py-1 text-lg truncate max-w-[15ch]" style={props.style}>
          {props.title}
        </p>
      </ContextButton>
    </li>
  );
}
