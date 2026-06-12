import ContextButton from "../controls/ContextButton";

interface FileDelegateProps {
  id: number;
  title: string;
  onSelected: (id: number) => void;
  onContextMenu: (fileId: number, x: number, y: number) => void;
}
export default function FileDelegate(props: FileDelegateProps) {
  return (
    <li
      className=" w-full hover:bg-slate-400 cursor-pointer px-3"
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
        <p className="px-4 py-1 text-lg truncate">{props.title}</p>
      </ContextButton>
    </li>
  );
}
