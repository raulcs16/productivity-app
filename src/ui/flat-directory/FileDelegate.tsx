interface FileDelegateProps {
  id: number;
  title: string;
  onSelected: (id: number) => void;
  onContextMenu: (fileId: number, x: number, y: number) => void;
}
export default function FileDelegate(props: FileDelegateProps) {
  return (
    <li
      className=" w-full hover:bg-slate-400 cursor-pointer"
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
      <p className="px-4 py-1 text-lg">{props.title}</p>
    </li>
  );
}
