
import DataTable from "react-data-table-component";
import { Empty } from "antd";
import Loading from "./Loadding";
const DataTables = ({ columns, data, customStyles, userEmpty,loading }) => {
  return (
    <>
      { loading ?
      
      <Loading paragraph={10} />
      :
      userEmpty ? (
        <div className="empty-card">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <a>{"ບໍ່ມີຂໍ້ມູນ"}</a>
              </span>
            }
          ></Empty>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={customStyles}
        />
      )}
    </>
  );
};

export default DataTables;
