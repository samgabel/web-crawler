/**
 * Quick sort algorithm that returns an array of object property names sorted by property value
 * @param {object} obj - assign any object where all the property values are non-negative integers
 * @param {boolean} reverse - set `true` for reverse sort, default value is `false`
 */
function quickSortObject(obj, reverse=false) {
  let nums = Object.values(obj)
  let keys = Object.keys(obj)
  quickSort(nums, keys, 0, nums.length - 1, reverse)
  return keys
}

function quickSort(nums, keys, low, high, rev) {
  if (low < high) {
    const part = partition(nums, keys, low, high, rev)
    quickSort(nums, keys, low, part - 1, rev)
    quickSort(nums, keys, part + 1, high, rev)
  }
}

function partition(nums, keys, low, high, rev) {
  const pivot = nums[high]
  let i = low
  for (let j = low; j <= high; j++) {
    // for reverse=true we use '>' instead of '<'
    if (!rev) {
      if (nums[j] < pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        [keys[i], keys[j]] = [keys[j], keys[i]];
        i++
      }
    } else {
      if (nums[j] > pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        [keys[i], keys[j]] = [keys[j], keys[i]];
        i++
      }
    }
    // the above `rev` check allows for reverse sorting
  }
  [nums[i], nums[high]] = [nums[high], nums[i]];
  [keys[i], keys[high]] = [keys[high], keys[i]];
  return i
}



export { quickSortObject }
