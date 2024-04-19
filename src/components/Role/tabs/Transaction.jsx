import { Checkbox, FormControl, FormControlLabel, MenuItem, Select, Typography } from '@mui/material';
import { MDBCol, MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { GetTransactionRights } from '../../../api/Api';

const customFormGroupStyle1 = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  maxHeight: '550px', // Adjust as needed
  overflowY: 'auto', // Hide vertical overflow
  overflowX: 'auto', // Allow horizontal scrolling
  padding: '10px',
  width: '100%',
  height: '450px'

};
const customFormGroupStyle2 = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  maxHeight: '550px', // Adjust as needed
  overflowY: 'auto', // Hide vertical overflow
  overflowX: 'auto', // Allow horizontal scrolling
  padding: '40px',
  width: '60%',
  height: '450px',

};
function Transaction({ formDataEdit, mode, settransactions,setNewState,newState, }) {
  const [formData, setFormData] = useState({});
  const [mode1, setMode1] = useState("");
  const [AllowBillWiseAcc, setAllowBillWiseAcc] = useState(false);

React.useEffect(() => {
  if (newState === true) {
      setFormData({});
      setNewState(false); // Move this line before the return statement
      return; // Make sure to have a return statement here
  }
}, [newState]);
  useEffect(() => {
    setMode1(mode);
  }, [mode]);

  useEffect(() => {
    settransactions(formData)
  }, [formData])

  useEffect(() => {
    const TransactionRights = async () => {
      try {
        const response = await GetTransactionRights({ roleId: formDataEdit })
        const data = JSON.parse(response.result)
        const iBudgetLimitWarn = data.map((item) => item.iBudgetLimitWarn)
        const iCannotAddAfter = data.map((item) => item.iCannotAddAfter)
        const iCannotEditAfter = data.map((item) => item.iCannotEditAfter)
        const iCantPrintAfterValue = data.map((item) => item.iCantPrintAfterValue)
        const iCantRePrintAfterOption = data.map((item) => item.iCantRePrintAfterOption)
        const iCannotEditAfterDaysOfMon = data.map((item) => item.iCannotEditAfterDaysOfMon)
        const iCantPrintAfterOption = data.map((item) => item.iCantPrintAfterOption)
        const iCannotAddPrevEntries = data.map((item) => item.iCannotAddPrevEntries)
        const iCrLimitWarn = data.map((item) => item.iCrLimitWarn)
        const iNegativeCashChk = data.map((item) => item.iNegativeCashChk)
        const iNegativeStkChk = data.map((item) => item.iNegativeStkChk)
        const iCantRePrintAfterValue = data.map((item) => item.iCantRePrintAfterValue)
        const bAllowBillWiseAcc = data.map((item) => item.bAllowBillWiseAcc)
        const bCannotAddFutureTrans = data.map((item) => item.bCannotAddFutureTrans)
        const bNoCustomize = data.map((item) => item.bNoCustomize)



        setFormData({
          ...formData,
          iBudgetLimitWarn: iBudgetLimitWarn.join(','),
          iCannotAddAfter: iCannotAddAfter.join(','),
          iCannotEditAfter: iCannotEditAfter.join(','),
          iCantPrintAfterValue: iCantPrintAfterValue.join(','),
          iCantRePrintAfterOption: iCantRePrintAfterOption.join(','),
          iCannotEditAfterDaysOfMon: iCannotEditAfterDaysOfMon.join(','),
          iCantPrintAfterOption: iCantPrintAfterOption.join(','),
          iCannotAddPrevEntries: iCannotAddPrevEntries.join(','),
          iCrLimitWarn: iCrLimitWarn.join(','),
          iNegativeCashChk: iNegativeCashChk.join(','),
          iNegativeStkChk: iNegativeStkChk.join(','),
          iCantRePrintAfterValue: iCantRePrintAfterValue.join(','),
          bAllowBillWiseAcc: bAllowBillWiseAcc.join(','),
          bCannotAddFutureTrans: bCannotAddFutureTrans.join(','),
          bNoCustomize: bNoCustomize.join(','),


        })
      } catch (error) {
        console.log("Transaction Rights", error);
      }
    }
    if (formDataEdit > 0) {
      TransactionRights()

    }
    if (mode1 === "new") {
      setFormData(getInitialFormData());
    }
  }, [mode1, formDataEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <div>
      <div style={{ display: 'flex' }}>


        <div style={customFormGroupStyle2}  >
          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginBottom: '10px' }}>
            <FormControlLabel
              control={<Checkbox
                onChange={(e) => setFormData({ ...formData, bAllowBillWiseAcc: e.target.checked })}
                checked={formData.bAllowBillWiseAcc}
                sx={{ height: "10px" }}
              />}
              label="Allow Bill Wise On Account"
            />

          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Budget Limit Warning</Typography>
            </MDBCol>
            <MDBCol >
              <FormControl sx={{ paddingBottom: "10px" }} >
                <Select id="dropdown1" style={{ width: "200px", height: '30px' }}
                  value={formData.iBudgetLimitWarn || 0}
                  onChange={(e) => setFormData({ ...formData, iBudgetLimitWarn: e.target.value })}
                >
                  <MenuItem value={0}>Not Applicable</MenuItem>
                  <MenuItem value={1}>Allow</MenuItem>
                  <MenuItem value={2}>Alert</MenuItem>
                  <MenuItem value={3}>Stop</MenuItem>

                </Select>
              </FormControl>

            </MDBCol>

          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Credit Limit Warning</Typography>
            </MDBCol>
            <MDBCol >
              <FormControl sx={{ paddingBottom: "10px" }} >
                <Select id="dropdown1" style={{ width: "200px", height: '30px' }}
                  value={formData.iCrLimitWarn || 0}
                  onChange={(e) => setFormData({ ...formData, iCrLimitWarn: e.target.value })}

                >
                  <MenuItem value={0}>Not Applicable</MenuItem>
                  <MenuItem value={4}>Request credit limit increase</MenuItem>
                  <MenuItem value={2}>Alert</MenuItem>
                  <MenuItem value={3}>Stop</MenuItem>
                </Select>
              </FormControl>

            </MDBCol>

          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Negative Cash check</Typography>
            </MDBCol>
            <MDBCol >
              <FormControl sx={{ paddingBottom: "10px" }} >
                <Select id="dropdown1" style={{ width: "200px", height: '30px' }}
                  value={formData.iNegativeCashChk || 0}
                  onChange={(e) => setFormData({ ...formData, iNegativeCashChk: e.target.value })}

                >
                  <MenuItem value={0}>Not Applicable</MenuItem>
                  <MenuItem value={1}>Allow</MenuItem>
                  <MenuItem value={2}>Alert</MenuItem>
                  <MenuItem value={3}>Stop</MenuItem>
                </Select>
              </FormControl>

            </MDBCol>

          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Negative Stock check</Typography>
            </MDBCol>
            <MDBCol >
              <FormControl sx={{ paddingBottom: "10px" }} >
                <Select id="dropdown1" style={{ width: "200px", height: '30px' }}
                  value={formData.iNegativeStkChk || 0}
                  onChange={(e) => setFormData({ ...formData, iNegativeStkChk: e.target.value })}

                >
                  <MenuItem value={0}>Not Applicable</MenuItem>
                  <MenuItem value={1}>Allow</MenuItem>
                  <MenuItem value={2}>Alert</MenuItem>
                  <MenuItem value={3}>Stop</MenuItem>
                </Select>
              </FormControl>

            </MDBCol>

          </div>

        </div>

        <div style={customFormGroupStyle1}>
          <Typography sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div">
            Edit Options
          </Typography>
          <div style={{ display: "flex", width: "100%", marginBottom: '10px' }}>
            <FormControlLabel
              control={<Checkbox
                onChange={(e) => setFormData({ ...formData, bCannotAddFutureTrans: e.target.checked })}
                checked={formData.bCannotAddFutureTrans}
                sx={{ height: "10px" }}
              />}
              label="Cannot add future Transactions"
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Cannot Add Transaction that are more than</Typography>
            </MDBCol>
            <MDBCol >
              <MDBInput
                required
                // value={name}
                id="form6Example1"
                maxLength={50}
                name="iCannotAddAfter"
                type='number'
                value={formData.iCannotAddAfter}
                onChange={handleInputChange}
                labelStyle={{
                  fontSize: "15px",
                }}
              />

            </MDBCol>
            <MDBCol >
              <Typography  > days</Typography>
            </MDBCol>
          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  >Cannot Edit previous months' entries after</Typography>
            </MDBCol>
            <MDBCol >
              <MDBInput
                required
                // value={name}
                id="form6Example1"
                maxLength={50}
                name="iCannotEditAfterDaysOfMon"
                type='number'
                value={formData.iCannotEditAfterDaysOfMon}
                onChange={handleInputChange}
                labelStyle={{
                  fontSize: "15px",
                }}
              />

            </MDBCol>
            <MDBCol >
              <Typography  >
                th day of the month</Typography>
            </MDBCol>
          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Cannot Edit Transaction that are more than</Typography>
            </MDBCol>
            <MDBCol >
              <MDBInput
                required
                // value={name}
                id="form6Example1"
                maxLength={50}
                name="iCannotEditAfter"
                type='number'
                value={formData.iCannotEditAfter}
                onChange={handleInputChange}
                labelStyle={{
                  fontSize: "15px",
                }}
              />

            </MDBCol>
            <MDBCol >
              <Typography  > days old</Typography>
            </MDBCol>
          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Cannot Add previous months' entries after</Typography>
            </MDBCol>
            <MDBCol >
              <MDBInput
                required
                // value={name}
                id="form6Example1"
                maxLength={50}
                name="iCannotAddPrevEntries"
                type='number'
                value={formData.iCannotAddPrevEntries}
                onChange={handleInputChange}
                labelStyle={{
                  fontSize: "15px",
                }}
              />

            </MDBCol>
            <MDBCol >
              <Typography  >
                th day of the month</Typography>
            </MDBCol>
          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Cannot Print After</Typography>
            </MDBCol>
            <MDBCol >
              <MDBInput
                required
                // value={name}
                id="form6Example1"
                maxLength={50}
                name="iCantPrintAfterValue"
                type='number'
                value={formData.iCantPrintAfterValue}
                onChange={handleInputChange}
                labelStyle={{
                  fontSize: "15px",
                }}
              />

            </MDBCol>
            <MDBCol >
              <FormControl  >
                <Select id="dropdown1" style={{ width: "100px", height: '30px' }}
                  value={formData.iCantPrintAfterOption || 0}
                  onChange={(e) => setFormData({ ...formData, iCantPrintAfterOption: e.target.value })}

                >
                  <MenuItem value={0}>Hour</MenuItem>
                  <MenuItem value={1}>Days</MenuItem>
                </Select>
              </FormControl>            </MDBCol>

          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <MDBCol >
              <Typography  > Cannot Re-Print After</Typography>
            </MDBCol>
            <MDBCol >
              <MDBInput
                required
                // value={name}
                id="form6Example1"
                maxLength={50}
                name="iCantRePrintAfterValue"
                type='number'
                value={formData.iCantRePrintAfterValue}
                onChange={handleInputChange}
                labelStyle={{
                  fontSize: "15px",
                }}
              />
            </MDBCol>
            <MDBCol >
              <FormControl  >
                <Select id="dropdown1" style={{ width: "100px", height: '30px' }}
                  value={formData.iCantRePrintAfterOption || 0}
                  onChange={(e) => setFormData({ ...formData, iCantRePrintAfterOption: e.target.value })}

                >
                  <MenuItem value={0}>Hour</MenuItem>
                  <MenuItem value={1}>Days</MenuItem>
                </Select>
              </FormControl>            </MDBCol>
          </div>
          <div style={{ display: "flex", width: "100%", marginBottom: '10px' }}>
            <FormControlLabel
              control={<Checkbox
                onChange={(e) => setFormData({ ...formData, bNoCustomize: e.target.checked })}
                checked={formData.bNoCustomize}
                sx={{ height: "10px" }}
              />}
              label="Do not allow Master Customization"
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Transaction