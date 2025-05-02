import _ from 'lodash'
import assert from 'assert'

// Quản lý và thực thi các tác vụ bất đồng bộ
class AsyncValidate {
    // Khởi tạo giá trị và hàm thực thi
    constructor(value, exec) {
        // Kiểm tra giá trị và hàm thực thi
        assert(_.isFunction(exec), new TypeError('"exec" is required and must be a function.'))
        this.value = value
        this.exec = exec
    }

    valueOf() {
        return this.value
    }

    // So sánh giá trị với giá trị khác
    equals(other, comparator = _.isEqual) {
        if (other instanceof AsyncValidate) {
            return comparator(this.value, other.value)
        }
        return false
    }
}

export default AsyncValidate
