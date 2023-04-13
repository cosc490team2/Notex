#JAVA PROGRAM
#	public static void main(String[] args) {
#		Scanner in = new Scanner(System.in);
#		System.out.print("Enter an integer: ");	
#		int input = in.nextInt();
#		for(int i = 0; i <= input; i++) {
#			if(isPrime(i)) System.out.print(i + " ");
#		}
#		in.close();
#	}
#	static boolean isPrime(int input) {
#		if(input == 1 || input == 0) {
#			return false; 	}	
#		for(int i = 2; i < input; i++) {
#			if(input % i == 0) return false;	}
#		return true;	
#	}
#}

.data
	msg1: .asciiz "Enter an integer: "
	space: .asciiz " "
	N: .word 1	
.text	
	#PROLOGUE - initalize sp and fp
	addi $sp $sp -8
	sw $fp 4($sp)
	addi $fp $sp 8
	
	#Print prompt
	li $v0 4
	la $a0 msg1
	syscall
	
	#Read input
	li $v0 5
	la $a0 N
	syscall
	
	la $t0 N	#t0 = input
	
	addi $t1 $t1 0	#i = 0
loop1:
	bgt $t1 $t0 end		#if i > input : go to end
	move $a0 $t0	
	jal isPrime
	
	beq $v0 $0 inc		#if isPrime(i) returns 0/false, inc
	beq $v0 1 print	
	j inc
print:
	li $v0 1
	move $a0 $t0
	syscall
	
	#print space
	li $v0 4
	la $a0 space
	syscall
	
	j inc
inc:
	addi $t1 $t1 1
	j loop1
isPrime:
	beq $t0 1 false		#if input = 1: false
	beq $t0 0 false		#if input = 0: false
	
	li $t2 2		#i = 2

innerLoop:
	bgt $t2 $t0 true	#if i > input: true
	beq $t2 $t0 true	#if i = input: true
	
	div $t0 $t2		#input/i
	mfhi $t3		#t3 = input % i
	beq $t3 $0 false	#if input % i == 0 -> false
	addi $t2 $t2 1		#i++
	j innerLoop		#restart loop
	
false:
	li $v0 0	#v0 = 0
	j end
true:
	li $v0 1	#v0 = 1
	j end
end:
	#EPILOGUE -> restore
	lw $ra 0($sp)
	lw $s0 4($sp)
	addi $sp $sp 8
	jr $ra
	
	
