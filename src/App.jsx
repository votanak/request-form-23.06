import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import * as XLSX from 'xlsx/xlsx.mjs';
registerLocale('ru', ru);
import styled from 'styled-components';
import { postRequest, getRequest, request } from './request';
import { useEffect } from 'react';

const AppStyle = styled.div`
  .react-datepicker__close-icon {
    margin-right: -30px;
  }
  .react-datepicker__input-container {
    & input {
      border-radius: 5px;
      border: gray 1px solid;
      padding: 5px;
    }
    &input: focus {
      border: gray 1px solid;
    }
  }
  .react-datepicker__close-icon::after {
    padding-top: 0;
  }
`;

const markArr = ['Магаз 1', 'Магаз 2', 'Магаз 3', 'Магаз 4'];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
  });
  const [markets, setMarkets] = useState([]);
  const [marketsFile, setMarketsFile] = useState('');

  useEffect(() => {
    getRequest('/markets', '').then((data) => {
      setMarkets(data.market_names);
    });
  }, []);

  const sendMarketsFile = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(marketsFile);
    fileReader.onload = (e) => {
      let workbook = XLSX.read(e.target.result, { type: 'binary' });
      let mArr = XLSX.utils.sheet_to_json(workbook.Sheets['Магазины']);
      let marketsArray = [];
      mArr.forEach((el) => {
        marketsArray.push({
          name: el['Название магазина'].toString() || '',
          marketplace: el['Площадка'].toString() || '',
          performance_key:
            el['performance key'] != null
              ? el['performance key'].toString()
              : '',
          performance_secret: el['performance secret']
            ? el['performance secret'].toString()
            : '',
          client_id: el['client id'].toString(),
          client_key: el['client key'].toString(),
          spreadsheet_url: el['Ссылка на Google-таблицу'].toString() || '',
        });
      });
      postRequest('/markets', { markets: marketsArray }).then(() => {
        document.querySelector('#file-input').value = '';
        alert('Данные успешно загружены');
        getRequest('/markets', '').then((data) => {
          setMarkets(data.market_names);
        });
        setMarketsFile('');
      });
    };
  };

  const sendForm = (e) => {
    e.preventDefault();
    postRequest('/req', {
      shopName: formData.name,
      startDate: formData.startDate,
      endDate: formData.startDate,
    })
      .then(() => alert(`Запрос по магазину ${formData.name} выполнен успешно`))
      .catch((err) => alert('Ошибка запроса: ', err));
    setFormData({
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  return (
    <AppStyle>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Загрузка файла с магазинами
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full ">
          <form
            name="markets-load-form"
            className=""
            onSubmit={sendMarketsFile}>
            <div className="mb-4 text-center">
              <div className="flex mx-4 justify-center items-center">
                <input
                  type="file"
                  id="file-input"
                  text="Загрузка файла..."
                  onChange={(e) => setMarketsFile(e.target.files[0])}
                  filename={marketsFile}
                  size={20}
                  className="bg-gray-50 sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  disabled={!marketsFile.name}
                  type="submit"
                  className="justify-center ms-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm">
                  Загрузить
                </button>
              </div>
            </div>
          </form>

          <form name="send-form" className="mt-10" onSubmit={sendForm}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Запрос на заполнение данных в google-таблицах
              </h2>
            </div>
            <div className="mt-4">
              <label
                htmlFor="market"
                className="block text-sm font-medium text-gray-900 mx-auto sm:max-w-sm">
                Выберите магазин
              </label>
              <div className="mt-2">
                <select
                  name="market"
                  id="market"
                  required
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }>
                  <option value="">-- Выберите магазин --</option>
                  {markets?.map((el, ind) => (
                    <option value={el} key={ind}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex justify-center flex-col">
                <div className="text-center mt-4">Временной диапазон</div>
                <DatePicker
                  id="dates"
                  name="dates"
                  locale="ru"
                  required
                  selectsRange={true}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  isClearable={true}
                  dateFormat="dd/MM/yyyy"
                  onChange={(update) =>
                    setFormData({
                      ...formData,
                      startDate: update[0],
                      endDate: update[1],
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!formData.name}
                className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm">
                Отправить запрос
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppStyle>
  );
}

export default App;
