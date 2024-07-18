import React, { useState } from 'react';
import { ChevronRightIcon, CircleX, PlusIcon } from 'lucide-react';

interface UserTreeNotes {
    _id: string;
    title: string;
    parent_id?: string;
    children_id: string[];
    brief: string;
    updatedAt: Date;
}

interface TreeNodeProps {
    node: UserTreeNotes;
    allNodes: UserTreeNotes[];
    onAddClick: (id: string) => void;
    onNodeClick: (id: string) => void;
    onNodeDelete: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, allNodes, onAddClick, onNodeClick,onNodeDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleNodeClick = () => {
        onNodeClick(node._id);
    };

    const childrenNodes = allNodes.filter(n => node.children_id.includes(n._id));

    return (
        <div className={`ml-5  ${isExpanded ? 'border-l-2 mt-2' : ''}`}>
            <div className="flex items-center">
                {childrenNodes.length > 0 && (
                    <ChevronRightIcon
                        className={`h-5 w-5 cursor-pointer transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                        onClick={handleExpandClick}
                    />
                )}
                <div className="text-xs ml-2  cursor-pointer" onClick={handleNodeClick}>
                    <strong>{node.title  || 'Untitled '}</strong> - {node.brief}
                </div>
                <PlusIcon
                    className="h-5 w-5 ml-2 cursor-pointer"
                    onClick={() => onAddClick(node._id)}
                />
                <CircleX
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={() => onNodeDelete(node._id)}/>
            </div>
            {isExpanded && childrenNodes.length > 0 && (
                <div className="pl-5">
                    {childrenNodes.map(childNode => (
                        <TreeNode
                            key={childNode._id}
                            node={childNode}
                            allNodes={allNodes}
                            onAddClick={onAddClick}
                            onNodeClick={onNodeClick}
                            onNodeDelete={onNodeDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface TreeViewProps {
    rootNodeId: string;
    nodes: UserTreeNotes[];
    onAddClick: (id: string) => void;
    onNodeClick: (id: string) => void;
    onNodeDelete: (id: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ rootNodeId, nodes, onAddClick, onNodeClick,onNodeDelete }) => {
    const rootNode = nodes.find(n => n._id === rootNodeId);
    console.log("nocceeee",nodes)
    if (!rootNode) {
        return <div>Root node not found</div>;
    }

    return (
        <TreeNode
            
            node={rootNode}
            allNodes={nodes}
            onAddClick={onAddClick}
            onNodeClick={onNodeClick}
            onNodeDelete={onNodeDelete}
        />
    );
};

export default TreeView;
