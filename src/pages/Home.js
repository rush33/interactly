import { useDispatch, useSelector } from "react-redux";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "../components/TextUpdaterNode";
import "../styles/text-updater-node.css";
import ButtonEdge from "../components/ButtonEdge";
import {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
} from "../features/flowSlice";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};
const edgeTypes = {
  buttonedge: ButtonEdge,
};

const Home = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);

  const handleAddNode = () => {
    dispatch(addNode());
  };

  const handleNodesChange = (changes) => {
    dispatch(onNodesChange(changes));
  };

  const handleEdgesChange = (changes) => {
    dispatch(onEdgesChange(changes));
  };

  const handleConnect = (params) => {
    dispatch(onConnect(params));
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          edges={edges}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          edgeTypes={edgeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
        <button
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: "blue",
            border: "none",
            color: "white",
            padding: "1rem 2rem",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
          }}
          onClick={handleAddNode}
        >
          Add Node
        </button>
      </div>
    </>
  );
};

export default Home;
