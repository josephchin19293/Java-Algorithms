// Quicksort is an efficient sorting algortihm
// whereby a pivot is chosen and every element greater is
// sent to the right
// and every element smaller is sent to the left
// then the algo is recursively called on on
// either the sublists to the left and right

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class QuickSort {

    public static void main(String[] args) {
      int[] arr_median = {3,7,8,2,1,5,11,4,9,10,6};
      System.out.println("Quicksort with median pivot (best); input: " + Arrays.toString(arr_median));
      long startTime = System.nanoTime();
      quickSort(arr_median, 0, arr_median.length-1);
      long endTime = System.nanoTime();
      System.out.println(Arrays.toString(arr_median));
      Long time = (endTime - startTime) / 100000;
      System.out.println("Time taken: " + time);

      int[] arr_sorted = {1,2,3,4,5,6,7,8,9,10,11};
      System.out.println("Quicksort with sorted array (worst); input: " + Arrays.toString(arr_sorted));
      long startTime1 = System.nanoTime();
      quickSort(arr_sorted, 0, arr_sorted.length-1);
      long endTime1 = System.nanoTime();
      System.out.println(Arrays.toString(arr_sorted));
      Long time1 = (endTime - startTime) / 100000;
      System.out.println("Time taken: " + time);

      // in the find sum kata, you can use a sorting
      // algorithm to improve the run-time of your
      // solution.

      // if you write a quick-sort you can use pointers
      // to make a 1-pass solution to the problem.

      // in the findsum you are given a sum and a list
      // and you have to find all the pairs of integers
      // in the list that add up to make the sum
      // eg findsum(9, {4,5,2,9,0,7,3}) => {{4,5}, {2,7}, {9,0}}

      // see function for explanation
    }

    public static void quickSort(int[] arr, int start, int end){
      int partition = partition(arr, start, end);

      if(partition-1>start) {
          quickSort(arr, start, partition - 1);
      }
      if(partition+1<end) {
          quickSort(arr, partition + 1, end);
      }
    }

    public static int partition(int[] arr, int start, int end){
      int pivot = arr[end];

      for(int i=start; i<end; i++){
          if(arr[i]<pivot){
              int temp= arr[start];
              arr[start]=arr[i];
              arr[i]=temp;
              start++;
          }
      }

      int temp = arr[start];
      arr[start] = pivot;
      arr[end] = temp;

      return start;
    }

    public static List<List<Integer>> findSum(int sum, List list) {
      List<List<Integer>> returnList = new ArrayList<List<Integer>>();
      return returnList;
    }
}
