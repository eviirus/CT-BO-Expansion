import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const RemoveButton = ({ rowKey, removeRow }) => {
  return (
    <Tooltip title="Remove row" placement="left">
      <Button
        icon={<DeleteOutlined />}
        onClick={() => removeRow(rowKey)}
        color="red"
        variant="outlined"
      ></Button>
    </Tooltip>
  );
};

export default RemoveButton;
