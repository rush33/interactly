import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBezierPath } from "reactflow";
import { FaMinus } from "react-icons/fa";
import { removeEdge } from "../features/flowSlice";

import "../styles/button-edge.css";

const foreignObjectSize = 40;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log(isHovered);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    console.log(isHovered);
  };
  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    dispatch(removeEdge(id));
  };

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        {isHovered && (
          <div
            className="edgebutton"
            onClick={(event) => onEdgeClick(event, id)}
          >
            <FaMinus />
          </div>
        )}
      </foreignObject>
    </>
  );
}
