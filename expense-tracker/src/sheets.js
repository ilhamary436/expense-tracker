const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

async function appendExpense(data) {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    // Attempt to load header row
    try {
      await sheet.loadHeaderRow();
    } catch (err) {
      console.log('No header row found, initializing...');
      await sheet.setHeaderRow(['waktu', 'tipe', 'nominal', 'keterangan', 'kategori']);
      await sheet.loadHeaderRow(); // Reload after setting
    }

    await sheet.addRow(data);
    return true;
  } catch (error) {
    console.error('Error appending expense:', error);
    return false;
  }
}

async function getCategories() {
  try {
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle['Kategori'];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Kategori', headerValues: ['Kategori'] });
      await sheet.addRow({ 'Kategori': 'Makanan' });
      await sheet.addRow({ 'Kategori': 'Transportasi' });
      await sheet.addRow({ 'Kategori': 'Belanja' });
    }
    
    const rows = await sheet.getRows();
    return rows.map(row => row.get('Kategori'));
  } catch (error) {
    console.error('Error getting categories:', error);
    return ['Makanan', 'Transportasi', 'Belanja'];
  }
}

async function addCategory(category) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['Kategori'];
        await sheet.addRow({ 'Kategori': category });
        return true;
    } catch (error) {
        console.error('Error adding category:', error);
        return false;
    }
}

async function deleteCategory(category) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['Kategori'];
        const rows = await sheet.getRows();
        const row = rows.find(r => r.get('Kategori') === category);
        if (row) {
            await row.delete();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting category:', error);
        return false;
    }
}

async function getExpenses(filter = {}) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        
        let expenses = rows.map(row => ({
            waktu: row.get('waktu'),
            tipe: row.get('tipe'),
            nominal: row.get('nominal'),
            keterangan: row.get('keterangan'),
            kategori: row.get('kategori')
        }));

        if (filter.tipe) {
            expenses = expenses.filter(e => e.tipe === filter.tipe);
        }
        
        if (filter.tanggal) {
            // Asumsi filter.tanggal format "DD/MM/YYYY"
            expenses = expenses.filter(e => e.waktu.startsWith(filter.tanggal));
        } else if (filter.bulan) {
            // Asumsi format waktu "DD/MM/YYYY HH:mm"
            expenses = expenses.filter(e => e.waktu.split('/')[1] === filter.bulan);
        }

        // Urutkan berdasarkan tanggal (DD/MM/YYYY)
        expenses.sort((a, b) => {
            const [d1, m1, y1] = a.waktu.split(' ')[0].split('/').map(Number);
            const [d2, m2, y2] = b.waktu.split(' ')[0].split('/').map(Number);
            return (y1 - y2) || (m1 - m2) || (d1 - d2);
        });

        return expenses;
    } catch (error) {
        console.error('Error getting expenses:', error);
        return [];
    }
}

async function deleteByDate(date) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        // Find all rows where 'waktu' starts with the date (DD/MM/YYYY)
        const toDelete = rows.filter(r => r.get('waktu').startsWith(date));
        for (const row of toDelete) {
            await row.delete();
        }
        return toDelete.length;
    } catch (error) {
        console.error('Error deleting by date:', error);
        return -1;
    }
}

module.exports = { appendExpense, getCategories, addCategory, deleteCategory, getExpenses, deleteByDate };
