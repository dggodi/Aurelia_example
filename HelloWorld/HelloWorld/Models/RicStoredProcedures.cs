using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Collections.Generic;

namespace HelloWorld.Models
{
    public class RicStoredProcedures
    {
        public List<RequestTable> GetAll()
        {
            List<RequestTable> lstRequestTable = new List<RequestTable>();
            try
            {
                string ConnectionPath = ConfigurationManager.ConnectionStrings[""].ToString();
                using (var sqlCon = new SqlConnection(ConnectionPath))
                {
                    using (SqlCommand cmd = new SqlCommand("GetAll", sqlCon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        sqlCon.Open();
                        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        while (dr.Read())
                        {
                            lstRequestTable
                              .Add
                              (
                                new RequestTable
                                {
                                    RIC_ID = Convert.ToInt32(dr["RIC_ID"].ToString())
                                  ,
                                    SubmitterUserId = dr["SubmitterUserId"].ToString()
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
            return lstRequestTable;
        }

        public RequestTable GetRequestTable(int id)
        {
            //RequestTable result = new RequestTable();
            DataSet ds = new DataSet();
            try
            {
                string ConnectionPath = ConfigurationManager.ConnectionStrings[""].ToString();
                using (var con = new SqlConnection(ConnectionPath))
                {
                    using (SqlCommand cmd = new SqlCommand("", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("RIC_ID", SqlDbType.Int).Value = id;
                        if(con.State != ConnectionState.Open)
                        {
                            con.Open();

                        }
                        SqlDataAdapter adp = new SqlDataAdapter();
                        adp.SelectCommand = cmd;
                        adp.Fill(ds);

                        //RequestTable a = ds.DataTableToList();

                        if (con.State == ConnectionState.Open)
                        {
                            con.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }


        public int InsertRequestTable(RequestTable requestTable)
        {
            int record = 0;

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings[""].ConnectionString))
                {

                    using (SqlCommand cmd = new SqlCommand("InserRequestTable", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("SubmitterUserId", SqlDbType.VarChar, 10).Value = requestTable.SubmitterUserId;
                        if (con.State != ConnectionState.Open)
                        {
                            con.Open();
                        }
                        record = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return record;
        }
    }
}