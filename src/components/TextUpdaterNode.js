import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteNode } from "../features/flowSlice";
import { removeNode } from "../features/flowSlice";

function TextUpdaterNode({ id, isConnectable }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    dispatch(removeNode(id));
  };

  return (
    <div
      className="text-updater-node"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          className="delete-button"
          onClick={(event) => onEdgeClick(event, id)}
        >
          <FaMinus />
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="text-updater-div">
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
