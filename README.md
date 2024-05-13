# Simplest React Table

A simple solution to add custom table in your React app, with pagination, selectable entries per page, search and sort.

  ### How to use

  Import CustomTable in your component with those attribute:

  ```
  <CustomTable
          title={"someTitle"}
          id={"someId"}
          labels={labelsList}
          datas={datas}
          options={{
            headerFont: "white",
            headerBackground: "black",
            oddLines: "lightGray",
            oddFont: "black",
            evenLines: "gray",
            evenFont: "white",
          }}
        />
  ```

  ### Formats

  #### Title

type : string

  #### Id

type : string

  #### Labels

  Labels must be an array of objects, each object containing a "label" for the value displayed on the table and "id" for the key in your datas array.

  type :  
  ```
  [
      {
          label: string,
          id: "string"
      }
  ]
  ```  

#### Datas

  Datas must be an array of objects, each object containing a label and a value. If an entry is missing a value, it'll be filled with an empty box else the entry will be filled with the corresponding values.

  type :  

  ```
  [
    {
      label1: string,
      label2: string,
      label3: string
    }
  ]
  ```

#### Options

  Some options can be passed to modify table styles. They are OPTIONAL. Options is an object.

  You can customize font and background color for header, even lines and odd lines.

  type :  
  ```
  {
    headerBackground: string,
    headerFont: string,
    oddLines: string, 
    oddFont: string,
    evenLines: string,
    evenFont: string,
  }

  ```
