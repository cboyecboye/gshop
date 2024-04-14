import MySQL from 'mysql2/promise';

export async function executeDB(sql , data = [] ){
    const result = {
        error : '',
        rows : [],
    }
    try {
        const conn = await MySQL.createConnection({
            host : 'localhost',
            user : 'admin',
            password : '17728336',
            database : 'gshop',
        });

        const [rows] = await conn.execute(sql, data);
        conn.end();
        result.rows = rows;
    } catch (error) {
        result.error  = error.message;
    }
    return result;
}
