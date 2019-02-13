package com.revature.spark.todo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.revature.spark.beans.Customer;
import com.revature.spark.beans.Flight;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Your Name Here
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the total ticket sales of all flights.
	 * 
	 * @param flights
	 * @return
	 */
	public Double sum(List<Flight> flights) {
		double total = 0.0;
		for(int i = 0; i < flights.size(); i++) {
			total = total + flights.get(i).getTicketPrice();
		}
		return total;
	}

	/**
	 * Find the lowest ticker price.
	 * 
	 * @param flights
	 * @return
	 */
	public Double min(List<Flight> flights) {
		double minVal = flights.get(0).getTicketPrice();
		for(int i = 1; i < flights.size(); i++) {
			if(flights.get(i).getTicketPrice() < minVal) {
				minVal = flights.get(i).getTicketPrice();
			}
		}
		return minVal;
	}

	/**
	 * Find the highest ticket price.
	 * 
	 * @param flights
	 * @return
	 */
	public Double max(List<Flight> flights) {
		double maxVal = flights.get(0).getTicketPrice();
		for(int i = 1; i < flights.size(); i++) {
			if(flights.get(i).getTicketPrice() > maxVal) {
				maxVal = flights.get(i).getTicketPrice();
			}
		}
		return maxVal;
	}

	/**
	 * Find the average ticket price.
	 * 
	 * @param flights
	 * @return
	 */
	public Double avg(List<Flight> flights) {
		double total = sum(flights);
		double average = total / flights.size();
		return average;
	}

	/**
	 * Find the median ticket price.
	 * 
	 * @param flights
	 * @return
	 */
	public Double median(List<Flight> flights) {
		int middle = flights.size() / 2;
		double ticketArray[] = new double[flights.size()];
		for(int i = 0; i < flights.size(); i++) {
			ticketArray[i] = flights.get(i).getTicketPrice();
		}
		double[] sortedArr = selectionSort(ticketArray);
		System.out.println(middle);
		double evenMid = 0;
		//return middle;
		if(flights.size() %2 == 0) {
			evenMid = (sortedArr[middle] + sortedArr[middle+1])/2;
			return evenMid;
		}
		else {	
			return sortedArr[middle];
			
		}

		
	}
	
	public double[] selectionSort(double[] arr){
        int minindex = 0;
        for(int i = 0; i < arr.length; i++){
            minindex = i;
            for(int j = i+1; j < arr.length; j++){
                if(arr[j] < arr[minindex]){
                    minindex = j;
                }
            }
            double temp = arr[i];
            arr[i] = arr[minindex];
            arr[minindex]=temp;
        }
        return arr;
    }

	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the total sales for each customer given a list of Flights.
	 * 
	 * Let's look at some example data:
	 * 
	 * Flights 
	 * FlightNo | Destination | Departs | Ticket Price | Customer
	 * 1        | Albuquerque | Austin  |   $150       | A
	 * 2        | Denver      | Seattle |   $210       | B
	 * 3        | Dallas      | Orlando |   $190       | B
	 * 4        | Las Vegas   | Houston |   $300       | C
	 * 5        | Phoenix     | Atlanta |   $340       | A
	 * 6        | Tampa       | New York|   $270       | C
	 * -----------------------------------
	 * Results:
	 * Customer A : $490
	 * Customer B : $400
	 * Customer C : $570
	 * 
	 * @param flights
	 * @return
	 */
	public Map<Customer, Double> totalSalesPerCustomer(List<Flight> flights) {
		return new HashMap<>();
	}

}
