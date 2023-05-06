import { createSlice } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges, removeElements } from "reactflow";

const initialState = {
  nodes: [],
  edges: [],
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addNode: (state) => {
      const lastNodePosition =
        state.nodes.length > 0
          ? state.nodes[state.nodes.length - 1].position
          : { x: 200, y: 50 };
      const newNode = {
        id: Date.now().toString(),
        type: "textUpdater",
        position: { x: lastNodePosition.x + 40, y: lastNodePosition.y + 80 },
      };
      state.nodes.push(newNode);
    },
    onNodesChange: (state, action) => {
      const changes = action.payload;
      state.nodes = applyNodeChanges(changes, state.nodes);
    },
    onEdgesChange: (state, action) => {
      const changes = action.payload;
      state.edges = applyEdgeChanges(changes, state.edges);
    },
    onConnect: (state, action) => {
      const params = action.payload;
      state.edges.push({ ...params, type: "buttonedge" });
    },
    removeEdge: (state, action) => {
      const edgeId = action.payload;
      state.edges = state.edges.filter((edge) => edge.id !== edgeId);
    },
    removeNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
    },
  },
});

export const {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
  removeEdge,
  removeNode,
} = flowSlice.actions;

export default flowSlice.reducer;
