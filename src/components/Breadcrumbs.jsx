
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
const Breadcrumbs = () => {
    const location = useLocation();
    const pageTitle = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);
        // console.log("pathnames",pathnames)
        const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
        return (
            <>
                <Breadcrumb>
                    {
                        pathnames.length > 0 ?
                            <Breadcrumb.Item>
                                <Link to="/dashboard">ຍິນດີຕ້ອນຮັບ</Link>
                            </Breadcrumb.Item>
                            :
                            <Breadcrumb.Item>
                                ຍິນດີຕ້ອນຮັບ
                            </Breadcrumb.Item>
                    }
                    {pathnames.map((name, index) => {
                        // console.log("name",name)
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        // console.log("RouteTo",routeTo);
                        const isLast = index === pathnames.length - 1;
                        // console.log("isLast",isLast);

                        return isLast ? (
                            <Breadcrumb.Item>
                                {capatilize(name)}
                                <svg className="icon-path-childen" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path d="M8 0V8H0L8 0Z" fill="#01A5E8" />
                                </svg>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item>
                                <Link to={`${routeTo}`}>
                                    {capatilize(name)}
                                    <svg className="icon-path-childen" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M8 0V8H0L8 0Z" fill="#01A5E8" />
                                    </svg>
                                </Link>
                            </Breadcrumb.Item>
                        )
                    }
                    )}
                </Breadcrumb>
            </>
        )
    }
    return (
        <div>
            {pageTitle()}
        </div>
    );
};

export default Breadcrumbs;