import React, {useState} from 'react';
import './index.sass'
import logo1 from './tempLogo/logo1.png'
import logo2 from './tempLogo/logo2.svg'
import AdminBrandsForm from "./AdminBrandsForm";


interface allBrandsI {
    id: number,
    logo: string,
    fullName: string,
}

const AdminBrands = () => {
    const [allBrands, setAllBrands] = useState<allBrandsI[]>([
        {
            id: 1,
            logo: logo1,
            fullName: 'Brand 1',
        },
        {
            id: 2,
            logo: logo2,
            fullName: 'Brand 2',
        }
    ])

    return (
        <div className={'admin-main'}>
            <h2 className={'admin-main__title'}>List of brands</h2>
            <div className={'admin-main__content'}>
                <div className={'admin-main__content-left'}>
                    <table className={'admin-main__content-table'}>
                        <thead>
                        <tr><th className={'admin-main__content-table-id'}>id</th><th>logo</th><th>full name</th></tr>
                        </thead>
                        <tbody>
                        {
                            allBrands.map(item => (
                                <tr key={item.id}><td>{item.id}</td><td><img src={item.logo} alt={item.fullName}/></td><td>{item.fullName}</td></tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>
                <div className={'admin-main__content-right'}>
                    <AdminBrandsForm />
                </div>
            </div>
        </div>
    );
};

export default AdminBrands;