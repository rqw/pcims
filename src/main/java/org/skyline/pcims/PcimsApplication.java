package org.skyline.pcims;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAutoConfiguration
@SpringBootApplication(scanBasePackages = { "com.haojiankang.framework","org.skyline.pcims" })
public class PcimsApplication {
	public static void main(String[] args) {
		SpringApplication.run(PcimsApplication.class, args);
	}

}
