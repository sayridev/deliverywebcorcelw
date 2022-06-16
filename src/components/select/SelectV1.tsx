import { Select } from "antd";
const { Option } = Select;
interface OptionProps {
  id: string;
  name: string;
}

interface Props {
  data: Object[];
  initialValue?: string;
  onHandleChange: (value: string) => void;
}
export const SelectV1 = ({ initialValue, data, onHandleChange }: Props) => {
  const newData: OptionProps[] = data as OptionProps[];
  return (
    <Select
      placeholder="Seleccione una opcion"
      allowClear
      onChange={onHandleChange}
      value={initialValue}
    >
      {newData?.length !== 0 &&
        newData?.map((data) => (
          <Option key={data.id} value={data.id}>
            {data.name}
          </Option>
        ))}
    </Select>
  );
};
