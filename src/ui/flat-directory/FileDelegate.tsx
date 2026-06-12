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
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          // Left-click on the 3 dots: Position relative to the button itself
          e.stopPropagation(); // Stop row click from triggering

          const rect = e.currentTarget.getBoundingClientRect();

          // Anchor the menu to the bottom-right corner of the button
          const menuX = rect.right;
          const menuY = rect.bottom;

          props.onContextMenu(props.id, menuX, menuY);
        }}
      >
        <p className="px-4 py-1 text-lg truncate">{props.title}</p>
      </ContextButton>
    </li>
  );
}
