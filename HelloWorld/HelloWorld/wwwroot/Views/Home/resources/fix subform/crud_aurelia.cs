<template>
<h2><font color="green">CRUD using Aurelia-fetch-client and WebAPI  - Example</font></h2>   

    <table border="1">            
      <tr>
          <td>
              <h1 style="color:blueviolet">Add/Update/Delete Employee</h1>
              <table border="1">
                  <tr>
                      <td>Employee Id</td>
                      <td><input id="txtEmployeeId" type="text" value.bind = "empID" /></td>
                  </tr>
                  <tr>
                      <td>Employee Name</td>
                      <td><input id="txtEmployeeName" type="text" value.bind = "empName" /></td>
                  </tr>
                  <tr>
                      <td>Email Address</td>
                      <td><input id="txtEmail" type="text" value.bind = "empEmail"/></td>
                  </tr>
                  <tr>
                      <td>Mobile Number</td>
                      <td><input id="txtMobile" type="text" value.bind = "empMobileNumber"/></td>
                  </tr>
              </table>                           
          </td>
      </tr>
  </table>
<table border="1">
<tr>
    <td><input type="button" id="btnInsert" value="Add Employee" click.delegate = "insertEmployee()"/></td>
    <td>
        <input type="button" id="btnUpdate" value="Update Employee" click.delegate = "updateEmployee()"/>
        <input type="button" id="btnDelete" value="Delete Employee" click.delegate = "deleteEmployee()"/>
    </td>
</tr>
</table>
<br />

<h2><font color="blue"><u>Display Employee Records</u></font></h2> 

  <table border="1">
    <thead>
      <tr>        
        <td><b>EmployeeID</b></td>
        <td><b>EmployeeName</b></td>
        <td><b>EmailAddress</b></td>
        <td><b>PhoneNumber</b></td>
      </tr>
    </thead>
    <tbody>
      <tr repeat.for="emp of empRecords">     
        
        <td>${emp.EmployeeID}</td>
        <td>${emp.EmployeeName}</td>
        <td>${emp.EmailAddress}</td> 
        <td>${emp.PhoneNumber}</td> 

      </tr>
    </tbody>
  </table>
</template>

// By default, fetch makes GET requests. All calls to fetch return a Promise object which is used for asynchronous computations. 
// This Promise object will resolve to a Response object. Using this Response object, we parse content and assign it to the UserRecords property.

import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';

let httpClient = new HttpClient();


constructor() {      
        this.empRecords = null;
        this.fetchEmployees();
} 

fetchEmployees(){
	httpClient.fetch('http://localhost:22900/Employee/EmployeeRecords')
    	.then(response => response.json())
        .then(data => { 
        	this.empRecords = data;                         
        });
}

// for insert, update, dlete you must set headers to json
insertEmployee(){
	var employee = {                                                  
    	"EmployeeName": this.empName,
        "EmailAddress": this.empEmail,
        "PhoneNumber": this.empMobileNumber
    };

    httpClient.fetch('http://localhost:22900/Employee/InsertEmployeeRecord', {
    method: "POST",         
    headers: { 'content-type': 'application/json'},body: JSON.stringify(employee)})                
              .then(response => response.json())
              .then(data => {        
                 this.empRecords = data;
              });               
}

updateEmployee(){
	var employee = {                                                  
    	"EmployeeID"  : this.empID,
		"EmployeeName": this.empName,
        "EmailAddress": this.empEmail,
        "PhoneNumber": this.empMobileNumber
    };

	httpClient.fetch('http://localhost:22900/Employee/UpdateEmployeeRecord', {
    	method: "PUT",         
        headers: {'content-type': 'application/json'}, body: JSON.stringify(employee)} )                
              .then(response => response.json())
              .then(data => {        
                 this.empRecords = data;
              });               
}

deleteEmployee(){
	var employeeID = this.empID;

     httpClient.fetch('http://localhost:22900/Employee/DeleteEmployeeRecord?employeeId='+employeeID, {
     method: "DELETE",         
     headers: {'content-type': 'application/json'}})                
     	.then(response => response.json())
        .then(data => {        
        	this.empRecords = data;
        });               
}  

// controller
using System.Collections.Generic;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [RoutePrefix("Employee")]
    public class EmployeeController : ApiController
    {       
        [Route("EmployeeRecords")]
        [HttpGet]
        public List<Employee> GetEmployeeRecords()
        {
            return DBOperations.GetEmployees();            
        }

        [Route("InsertEmployeeRecord")]
        [HttpPost]
        public List<Employee> InsertEmployeeRecords(Employee emp)
        {
            return DBOperations.InsertEmployee(emp) == -1 ? DBOperations.GetEmployees() : null;
        }

        [Route("UpdateEmployeeRecord")]
        [HttpPut]
        public List<Employee> UpdateEmployeeRecords(Employee emp)
        {
            return DBOperations.UpdateEmployee(emp) == -1 ? DBOperations.GetEmployees() : null;
        }

        [Route("DeleteEmployeeRecord")]
        [HttpDelete]
        public List<Employee> DeleteEmployeeRecords(int employeeId)
        {
            return DBOperations.DeleteEmployee(employeeId) == -1 ? DBOperations.GetEmployees() : null;
        }
    }    
}

// models
public class Employee
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
    }

// DB operations
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Models
{
    public class DBOperations
    {
        /// <summary>
        /// Function: GetEmployees
        /// Get the Employee Records
        /// </summary>
        /// <returns></returns>
        public static List<Employee> GetEmployees()
        {
            List<Employee> lstEmployees = new List<Employee>();
            try
            {
                string ConnectionPath = ConfigurationManager.ConnectionStrings["DbConnection"].ToString();
                using (var sqlCon = new SqlConnection(ConnectionPath))
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GetEmployees", sqlCon))
                    {                        
                        cmd.CommandType = CommandType.StoredProcedure;
                        sqlCon.Open();
                        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        while (dr.Read())
                        {
                            lstEmployees
                                .Add
                                (
                                    new Employee
                                    {
                                        EmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString())
                                         ,
                                        EmployeeName = dr["EmployeeName"].ToString()
                                         ,
                                        EmailAddress = dr["EmailAddress"].ToString()
                                         ,
                                        PhoneNumber = dr["PhoneNumber"].ToString()
                                    }

                                );                           
                        }
                        dr.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lstEmployees;
        }

        /// <summary>
        /// Function: InsertEmployee
        /// Insert an Employee record
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        public static int InsertEmployee(Employee emp)
        {
            var result = 0;
            try
            {
                string ConnectionPath = ConfigurationManager.ConnectionStrings["DbConnection"].ToString();
                using (var sqlCon = new SqlConnection(ConnectionPath))
                {
                    using (SqlCommand cmd = new SqlCommand("usp_InsertEmployee", sqlCon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@EmployeeName", SqlDbType.VarChar).Value = emp.EmployeeName;
                        cmd.Parameters.Add("@EmailAddress", SqlDbType.VarChar).Value = emp.EmailAddress;
                        cmd.Parameters.Add("@PhoneNumber", SqlDbType.VarChar).Value = emp.PhoneNumber;

                        sqlCon.Open();
                        result = cmd.ExecuteNonQuery();                        
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        /// <summary>
        /// Function: UpdateEmployee
        /// Update an Employee record
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        public static int UpdateEmployee(Employee emp)
        {
            var result = 0;
            try
            {
                string ConnectionPath = ConfigurationManager.ConnectionStrings["DbConnection"].ToString();
                using (var sqlCon = new SqlConnection(ConnectionPath))
                {
                    using (SqlCommand cmd = new SqlCommand("usp_UpdateEmployee", sqlCon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@EmployeeID", SqlDbType.Int).Value = emp.EmployeeID;
                        cmd.Parameters.Add("@EmployeeName", SqlDbType.VarChar).Value = emp.EmployeeName;
                        cmd.Parameters.Add("@EmailAddress", SqlDbType.VarChar).Value = emp.EmailAddress;
                        cmd.Parameters.Add("@PhoneNumber", SqlDbType.VarChar).Value = emp.PhoneNumber;

                        sqlCon.Open();
                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        /// <summary>
        /// Function: DeleteEmployee
        /// Deletes an Employee record
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        public static int DeleteEmployee(int employeeID)
        {
            var result = 0;
            try
            {
                string ConnectionPath = ConfigurationManager.ConnectionStrings["DbConnection"].ToString();
                using (var sqlCon = new SqlConnection(ConnectionPath))
                {
                    using (SqlCommand cmd = new SqlCommand("usp_DeleteEmployee", sqlCon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@EmployeeID", SqlDbType.Int).Value = employeeID;                        

                        sqlCon.Open();
                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}

// webapiconfig
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services    
            config.EnableCors();
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

// db stored prpcedures
USE [YOURDATABASE]
GO
/****** Object:  Table [dbo].[tblTestEmployee]    Script Date: 8/24/2016 12:12:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblTestEmployee](
        [EmployeeID] [int] IDENTITY(1,1) NOT NULL,
        [EmpName] [varchar](100) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  StoredProcedure [dbo].[usp_DeleteEmployee]    Script Date: 8/24/2016 12:12:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:              RNA Team
-- Description: Delete an employee
-- exec [dbo].[usp_DeleteEmployee] 1
-- =============================================
CREATE PROCEDURE [dbo].[usp_DeleteEmployee] 
        -- Add the parameters for the stored procedure here     
        (
                @EmployeeID INT
        )
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        DELETE 
        FROM [dbo].[tblEmployees]
        WHERE EmployeeID = @EmployeeID

END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetEmployees]    Script Date: 8/24/2016 12:12:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:              RNA Team
-- Description: Get employee records
-- exec [dbo].[usp_GetEmployees]
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetEmployees] 
        -- Add the parameters for the stored procedure here     
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        SELECT 
                        EmployeeID
                        ,EmployeeName
                        ,EmailAddress
                        ,PhoneNumber
        FROM [dbo].[tblEmployees]
END
GO
/****** Object:  StoredProcedure [dbo].[usp_InsertEmployee]    Script Date: 8/24/2016 12:12:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:              RNA Team
-- Description: Insert an employee
-- exec [dbo].[usp_InsertEmployee] 'Test1','TestEmail1','1234'
-- =============================================
CREATE PROCEDURE [dbo].[usp_InsertEmployee] 
        -- Add the parameters for the stored procedure here     
        (
                @EmployeeName VARCHAR(50)
                ,@EmailAddress VARCHAR(50)
                ,@PhoneNumber VARCHAR(50)
        )
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        INSERT INTO [dbo].[tblEmployees]
           ([EmployeeName]
           ,[EmailAddress]
           ,[PhoneNumber])
     VALUES
           (@EmployeeName
           ,@EmailAddress
           ,@PhoneNumber)
END
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateEmployee]    Script Date: 8/24/2016 12:12:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:              RNA Team
-- Description: Update an employee
-- exec [dbo].[usp_UpdateEmployee] 1,'Test2','TestEmail2','12342'
-- =============================================
CREATE PROCEDURE [dbo].[usp_UpdateEmployee] 
        -- Add the parameters for the stored procedure here     
        (
                @EmployeeID INT
                ,@EmployeeName VARCHAR(50)
                ,@EmailAddress VARCHAR(50)
                ,@PhoneNumber VARCHAR(50)
        )
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        UPDATE [dbo].[tblEmployees]
        SET 
                        [EmployeeName] = @EmployeeName
           ,[EmailAddress] = @EmailAddress
           ,[PhoneNumber] = @PhoneNumber
        WHERE EmployeeID = @EmployeeID
        
END
GO

       




